import type { Pet } from "../../types";

interface PetListProps {
  pets: Pet[];
  selectedPetId: string | null;
  onSelect: (id: string) => void;
  onEdit: (pet: Pet) => void;
  onDelete: (pet: Pet) => void;
  onAdd: () => void;
}

export function PetList({
  pets,
  selectedPetId,
  onSelect,
  onEdit,
  onDelete,
  onAdd
}: PetListProps) {
  return (
    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-16">
      {pets.map((pet, index) => {
        // 무작위 테이프 색상 및 각도
        const tapeColors = [
          "rgba(163, 188, 194, 0.7)", // tape-blue
          "rgba(201, 93, 78, 0.7)",   // stamp-red
          "rgba(107, 142, 111, 0.7)"  // primary green
        ];
        const tapeColor = tapeColors[index % tapeColors.length];
        const rotation = index % 2 === 0 ? "-rotate-2" : "rotate-1";
        const tapeRotation = index % 2 === 0 ? "rotate(-2deg)" : "rotate(3deg)";
        
        return (
          <article key={pet.id} className={`polaroid-frame w-64 relative transform ${rotation}`}>
            <div 
              className="absolute top-[-10px] left-1/2 w-20 h-6 z-10" 
              style={{ backgroundColor: tapeColor, transform: `translateX(-50%) ${tapeRotation}` }}
            ></div>
            <div 
              className="aspect-square bg-surface-container mb-3 overflow-hidden border border-paper-shadow cursor-pointer"
              onClick={() => onSelect(pet.id)}
            >
              {pet.photoBase64 ? (
                <img src={pet.photoBase64} alt={pet.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl">
                  {pet.emoji ?? (pet.species === "dog" ? "🐕" : "🐈")}
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-headline-md text-headline-md text-ink-black flex items-center justify-center gap-2">
                 {pet.name} {selectedPetId === pet.id && <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>}
              </h3>
              <p className="font-body-md text-body-md text-tertiary mt-1">
                {pet.species === "dog" ? "강아지" : "고양이"}{pet.breed ? ` · ${pet.breed}` : ""}
              </p>
            </div>
            
            <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-dashed border-outline-variant opacity-60 hover:opacity-100 transition-opacity">
              <button type="button" onClick={() => onEdit(pet)} className="text-sm font-label-md text-ink-black hover:text-primary">Edit</button>
              <button type="button" onClick={() => onDelete(pet)} className="text-sm font-label-md text-stamp-red hover:opacity-80">Delete</button>
            </div>
          </article>
        );
      })}
      
      {/* Add New Pet Sticker */}
      <article className="w-64 h-[320px] flex flex-col items-center justify-center relative mt-8 lg:mt-2 transform rotate-3">
        <button 
          onClick={onAdd}
          className="w-full h-full border-2 border-ink-black rounded-[255px_15px_225px_15px/15px_225px_15px_255px] bg-surface-bright flex flex-col items-center justify-center gap-4 hover:bg-surface-container-low transition-colors group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full border-2 border-ink-black border-dashed flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[32px] text-ink-black">add</span>
          </div>
          <span className="font-headline-md text-headline-md text-ink-black">Add New Friend</span>
        </button>
      </article>
    </div>
  );
}
