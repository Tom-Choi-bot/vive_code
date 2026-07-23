import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { Layout } from "../components/common/Layout";
import { Button } from "../components/common/Button";
import { Modal, ConfirmModal } from "../components/common/Modal";
import { EmptyState } from "../components/common/EmptyState";
import { RoutineForm } from "../components/routine/RoutineForm";
import { RoutineList } from "../components/routine/RoutineList";
import type { Routine } from "../types";

export function Routines() {
  const { pets, routines, addRoutine, updateRoutine, deleteRoutine } = useApp();
  const [formOpen, setFormOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  const [deletingRoutine, setDeletingRoutine] = useState<Routine | null>(null);

  const handleSubmit = (data: Omit<Routine, "id">) => {
    if (editingRoutine) {
      updateRoutine(editingRoutine.id, data);
    } else {
      addRoutine(data);
    }
    setFormOpen(false);
    setEditingRoutine(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingRoutine) {
      deleteRoutine(deletingRoutine.id);
      setDeletingRoutine(null);
    }
  };

  if (pets.length === 0) {
    return (
      <Layout title="Routines">
        <div className="torn-paper p-6 md:p-8 rounded-sm mb-stack-lg mx-2 md:mx-0 max-w-2xl mt-8 mx-auto">
          <EmptyState
            emoji="🐕"
            title="먼저 반려동물을 등록해주세요"
            description="루틴은 반려동물에 연결됩니다."
            action={
              <Link to="/pets">
                <Button>반려동물 등록하기</Button>
              </Link>
            }
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Routines">
      <div className="mb-stack-lg flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 relative z-10 mt-4">
        <div>
          <h2 className="font-display-lg text-display-lg text-ink-black mb-2">Routines</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">Manage daily care, medications, and activities for your furry family members.</p>
        </div>
        <button 
          onClick={() => {
            setEditingRoutine(null);
            setFormOpen(true);
          }}
          className="bg-primary hover:bg-primary/90 text-on-primary rounded-full px-6 py-3 font-label-md text-label-md flex items-center gap-2 shadow-[2px_2px_0_0_#3D3630] transition-transform active:translate-y-1 active:shadow-none whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Routine
        </button>
      </div>

      {routines.length === 0 ? (
        <div className="torn-paper p-6 md:p-8 rounded-sm mb-stack-lg w-full max-w-2xl mx-auto">
          <EmptyState
            emoji="📋"
            title="등록된 루틴이 없습니다"
            description="사료, 산책, 약 등 반복 돌봄 루틴을 추가해보세요."
          />
        </div>
      ) : (
        <RoutineList
          routines={routines}
          pets={pets}
          onEdit={(routine) => {
            setEditingRoutine(routine);
            setFormOpen(true);
          }}
          onDelete={setDeletingRoutine}
        />
      )}

      <Modal
        open={formOpen}
        title={editingRoutine ? "루틴 수정" : "New Routine"}
        onClose={() => {
          setFormOpen(false);
          setEditingRoutine(null);
        }}
      >
        <RoutineForm
          pets={pets}
          initial={editingRoutine ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false);
            setEditingRoutine(null);
          }}
        />
      </Modal>

      <ConfirmModal
        open={!!deletingRoutine}
        title="루틴 삭제"
        message={`"${deletingRoutine?.title}" 루틴을 삭제할까요? 관련 기록도 함께 삭제됩니다.`}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeletingRoutine(null)}
      />
    </Layout>
  );
}
