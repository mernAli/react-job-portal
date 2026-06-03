import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import useFeatureAccess, { FEATURES } from "../hooks/useFeatureAccess";

// ─────────────────────────────────────────────────────────
// LockedFeature
//
// Wraps any UI and gates it behind a plan check.
//
// Props:
//   featureKey   — key from FEATURES map (e.g. "AI_SCORE")
//   mode         — "blur"   : blurred preview + dismissible lock overlay card
//                  "hidden" : replaces content with full upgrade card
//                  "banner" : children shown + dismissible upsell banner above
//   pricingPath  — where upgrade CTA navigates
//   children     — the UI to gate
//
// Subscription behaviour:
//   When getUserPlan() returns "pro" or "enterprise", hasAccess() returns
//   true and LockedFeature renders children with zero wrapping — no blur,
//   no banner, no overlay. The gating is completely invisible to paid users.
//
// Blur mode close/reopen behaviour:
//   ✕ button on the overlay card dismisses the card.
//   The blurred area becomes clickable — clicking it brings the card back.
// ─────────────────────────────────────────────────────────

const LockedFeature = ({
  featureKey,
  mode = "blur",
  pricingPath,
  children,
}) => {
  const { theme }                            = useTheme();
  const navigate                             = useNavigate();
  const { hasAccess, requiredPlan, loading } = useFeatureAccess();

  // While plan is loading — render children normally (no flash of lock screen)
  if (loading) return <>{children}</>;

  // ── Subscribed user — render children with zero gating ──
  // hasAccess returns true for "pro" / "enterprise" plans.
  // This is the subscription check — paid users never see any lock UI.
  if (hasAccess(featureKey)) return <>{children}</>;

  // ── Locked state setup ────────────────────────────────
  const feature  = FEATURES[featureKey] || { label: "This feature" };
  const planName = requiredPlan(featureKey);
  const planLabel = planName
    ? planName.charAt(0).toUpperCase() + planName.slice(1)
    : "Pro";

  const handleUpgrade = () => {
    if (pricingPath) navigate(pricingPath);
    else navigate(-1);
  };

  // ── MODE: blur ────────────────────────────────────────
  if (mode === "blur") {
    return <BlurMode
      feature={feature}
      planLabel={planLabel}
      theme={theme}
      onUpgrade={handleUpgrade}
    >
      {children}
    </BlurMode>;
  }

  // ── MODE: hidden ──────────────────────────────────────
  if (mode === "hidden") {
    return (
      <div
        className={`${theme.cardBg} ${theme.border} border rounded-2xl
                    p-8 sm:p-12 text-center`}
      >
        <div
          className={`w-20 h-20 rounded-full ${theme.warningBg} flex items-center
                      justify-center text-4xl mx-auto mb-6`}
        >
          🔒
        </div>
        <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-3`}>
          {feature.label}
        </h2>
        <p
          className={`text-sm ${theme.textSecondary} mb-2 max-w-md mx-auto
                      leading-relaxed`}
        >
          You are currently on the{" "}
          <span className={`font-semibold ${theme.warningText}`}>Free plan</span>.
          Upgrade to{" "}
          <span className={`font-semibold ${theme.primaryText}`}>{planLabel}</span>{" "}
          to unlock {feature.label} and many more powerful features.
        </p>

        <FeaturePreviewList planLabel={planLabel} theme={theme} />

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button
            onClick={handleUpgrade}
            className="px-8 py-3 rounded-xl font-semibold text-sm text-white
                       bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            🚀 Upgrade to {planLabel}
          </button>
          <button
            onClick={() => navigate(-1)}
            className={`px-8 py-3 rounded-xl font-semibold text-sm
                        ${theme.border} border ${theme.textSecondary}
                        ${theme.hover} transition-colors`}
          >
            ← Go Back
          </button>
        </div>

        <PreviewBadge theme={theme} />
      </div>
    );
  }

  // ── MODE: banner ──────────────────────────────────────
  if (mode === "banner") {
    return (
      <div className="space-y-4">
        <UpsellBanner
          feature={feature}
          planLabel={planLabel}
          onUpgrade={handleUpgrade}
          theme={theme}
        />
        {children}
      </div>
    );
  }

  // Fallback
  return <>{children}</>;
};

export default LockedFeature;


// ─────────────────────────────────────────────────────────
// BlurMode — extracted so it can hold its own useState
// without violating Rules of Hooks inside conditionals
// ─────────────────────────────────────────────────────────
const BlurMode = ({ feature, planLabel, theme, onUpgrade, children }) => {
  // true  = overlay card visible (default)
  // false = card dismissed, blurred area is clickable to re-show
  const [cardVisible, setCardVisible] = useState(true);

  return (
    <div className="relative">

      {/* ── Blurred children ── */}
      {/* When card is dismissed: pointer-events re-enabled so clicking  */}
      {/* the blurred area reopens the card.                             */}
      <div
        style={{ filter: "blur(6px)", opacity: 0.45 }}
        aria-hidden="true"
        className={`select-none transition-opacity duration-300
                    ${!cardVisible
                      ? "cursor-pointer"
                      : "pointer-events-none"}`}
        onClick={!cardVisible ? () => setCardVisible(true) : undefined}
        title={!cardVisible ? "Click to view upgrade options" : undefined}
      >
        {children}
      </div>

      {/* ── Click hint shown when card is dismissed ── */}
      {!cardVisible && (
        <div
          className="absolute inset-0 flex items-center justify-center
                     pointer-events-none z-10"
        >
          <span
            className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5
                        rounded-full ${theme.cardBg} ${theme.border} border
                        ${theme.textMuted} shadow`}
          >
            🔒 Click to unlock
          </span>
        </div>
      )}

      {/* ── Lock overlay card ── */}
      {cardVisible && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div
            className={`${theme.cardBg} ${theme.border} border rounded-2xl
                        p-6 sm:p-8 text-center shadow-xl max-w-sm w-full mx-4
                        relative`}
          >
            {/* ✕ close button — top-right corner */}
            <button
              onClick={() => setCardVisible(false)}
              aria-label="Dismiss upgrade card"
              className={`absolute top-3 right-3 w-7 h-7 rounded-full
                          flex items-center justify-center text-sm font-bold
                          ${theme.textMuted} ${theme.hover} transition-colors`}
            >
              ✕
            </button>

            {/* Lock icon */}
            <div
              className={`w-16 h-16 rounded-full ${theme.warningBg} flex
                          items-center justify-center text-3xl mx-auto mb-4`}
            >
              🔒
            </div>

            {/* Title */}
            <h3 className={`text-lg font-bold ${theme.textPrimary} mb-2`}>
              {feature.label}
            </h3>

            {/* Description */}
            <p
              className={`text-sm ${theme.textSecondary} mb-5 leading-relaxed`}
            >
              This feature is available on the{" "}
              <span className={`font-semibold ${theme.primaryText}`}>
                {planLabel} plan
              </span>{" "}
              and above. Upgrade to unlock it.
            </p>

            {/* Upgrade CTA */}
            <button
              onClick={onUpgrade}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white
                         bg-blue-600 hover:bg-blue-700 transition-colors mb-3"
            >
              🚀 Upgrade to {planLabel}
            </button>

            <PreviewBadge theme={theme} />
          </div>
        </div>
      )}
    </div>
  );
};


// ─────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────

const PreviewBadge = ({ theme }) => (
  <p className={`text-xs ${theme.textMuted} mt-3`}>
    👁 You are seeing a preview of this feature
  </p>
);

const UpsellBanner = ({ feature, planLabel, onUpgrade, theme }) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className={`${theme.warningBg} ${theme.border} border rounded-xl p-4
                  flex items-start gap-3`}
      role="alert"
    >
      <span className="text-2xl flex-shrink-0">⭐</span>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${theme.textPrimary}`}>
          You are previewing {feature.label}
        </p>
        <p className={`text-xs ${theme.textSecondary} mt-0.5`}>
          Upgrade to {planLabel} for full access — unlock all features and
          remove restrictions.
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={onUpgrade}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs
                     font-semibold hover:bg-blue-700 transition-colors
                     whitespace-nowrap"
        >
          Upgrade →
        </button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className={`${theme.textMuted} hover:opacity-70 text-lg leading-none`}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

const FeaturePreviewList = ({ planLabel, theme }) => {
  const items = [
    "AI-powered profile score & insights",
    "Unlimited job applications",
    "Full ATS & recruiter dashboard",
    "Advanced analytics & reports",
    "AI video interview access",
    "Priority job listing placement",
  ];

  return (
    <div
      className={`${theme.bg} ${theme.border} border rounded-xl p-5
                  max-w-sm mx-auto mt-5 text-left`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-wide
                    ${theme.textMuted} mb-3`}
      >
        ✨ What you get with {planLabel}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className={`text-sm ${theme.successText} flex-shrink-0`}>
              ✓
            </span>
            <span className={`text-sm ${theme.textSecondary}`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};