import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Loader from "../ui/Loader";
import Modal from "../ui/Modal";
import { useToast } from "../ui/toast/useToast";
import Sidebar from "../components/Dashboard/Sidebar";

const UIDemo = () => {
  const { showToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <div className="p-8 space-y-8 w-65 lg:w-180">
      <Sidebar />
      <h1 className="text-2xl font-bold">UI Component Demo</h1>

      {/* Buttons */}
      <section>
        <h2 className="font-semibold mb-2">Buttons</h2>
        <div className="flex gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      {/* Input */}
      <section>
        <h2 className="font-semibold mb-2">Input</h2>
        <Input
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </section>

      {/* Select */}
      <section>
        <h2 className="font-semibold mb-2">Select</h2>
        <Select
          label="Role"
          options={[
            { label: "Developer", value: "dev" },
            { label: "Designer", value: "design" },
            { label: "Manager", value: "manager" },
          ]}
        />
      </section>

      {/* Loader */}
      <section>
        <h2 className="font-semibold mb-2">Loader</h2>
        <div className="relative bottom-188 mb-24">
          <Loader size="lg" />
        </div>
      </section>

      <div className="relative bottom-188 mb-24">
        {/* Toast */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2">Toast</h2>
          <Button onClick={() => showToast("Success Toast", "success")}>
            Show Success Toast
          </Button>
        </section>

        {/* Modal */}
        <section>
          <h2 className="font-semibold mb-2">Modal</h2>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        </section>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Demo Modal"
          footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
        >
          <p className="text-white">This is reusable modal content.</p>
        </Modal>
      </div>
    </div>
  );
};

export default UIDemo;
