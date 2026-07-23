import { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { Layout } from "../components/common/Layout";
import { Modal, ConfirmModal } from "../components/common/Modal";
import { PetForm } from "../components/pet/PetForm";
import { PetList } from "../components/pet/PetList";
import type { Pet } from "../types";

export function Pets() {
  const { pets, selectedPetId, addPet, updatePet, deletePet, setSelectedPetId } = useApp();
  const [formOpen, setFormOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [deletingPet, setDeletingPet] = useState<Pet | null>(null);

  const handleSubmit = (data: Omit<Pet, "id">) => {
    if (editingPet) {
      updatePet(editingPet.id, data);
    } else {
      addPet(data);
    }
    setFormOpen(false);
    setEditingPet(null);
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setFormOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingPet) {
      deletePet(deletingPet.id);
      setDeletingPet(null);
    }
  };

  const handleAddClick = () => {
    setEditingPet(null);
    setFormOpen(true);
  };

  return (
    <Layout title="My Pets">
      <div className="w-full max-w-3xl mb-12 text-center relative mt-8 mx-auto">
        <div className="absolute -top-4 -left-4 w-12 h-12 text-tape-blue opacity-50 rotate-[-15deg]">
          <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
        </div>
        <h2 className="font-display-lg text-display-lg text-ink-black mb-4">The Family Album</h2>
        <p className="font-body-lg text-body-lg text-tertiary">All your beloved companions, documented in one cozy place.</p>
      </div>

      <div className="flex flex-col items-center">
        <PetList
          pets={pets}
          selectedPetId={selectedPetId}
          onSelect={setSelectedPetId}
          onEdit={handleEdit}
          onDelete={setDeletingPet}
          onAdd={handleAddClick}
        />
      </div>

      <Modal
        open={formOpen}
        title={editingPet ? "Edit Friend" : "New Friend"}
        onClose={() => {
          setFormOpen(false);
          setEditingPet(null);
        }}
      >
        <PetForm
          initial={editingPet ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false);
            setEditingPet(null);
          }}
        />
      </Modal>

      <ConfirmModal
        open={!!deletingPet}
        title="Say Goodbye?"
        message={`${deletingPet?.name}을(를) 삭제할까요? 연결된 루틴과 기록도 함께 삭제됩니다.`}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeletingPet(null)}
      />
    </Layout>
  );
}
