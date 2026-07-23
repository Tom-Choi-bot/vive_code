import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { useTodayChecklist } from "../hooks/useTodayChecklist";
import { Layout } from "../components/common/Layout";
import { EmptyState } from "../components/common/EmptyState";
import { Button } from "../components/common/Button";
import { ChecklistItemCard } from "../components/today/ChecklistItem";

export function Home() {
  const { pets, selectedPetId, setSelectedPetId, selectedPet } = useApp();
  const { items, completionRate } = useTodayChecklist();
  const today = new Date();
  
  const formattedDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(today);

  return (
    <Layout title="Today's Entry">
      {/* Date Header */}
      <div className="text-center mb-stack-lg transform -rotate-1">
        <p className="font-handwriting text-display-lg text-tertiary">{formattedDate}</p>
      </div>

      {/* Pet Selector (Polaroids) */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-stack-lg hide-scrollbar items-center justify-center sm:justify-start">
        {pets.map(pet => (
           <div 
             key={pet.id} 
             onClick={() => setSelectedPetId(pet.id)}
             className={`relative p-2 pb-6 border border-paper-shadow w-28 flex-shrink-0 cursor-pointer transition-transform ${selectedPetId === pet.id ? 'bg-surface-container-lowest shadow-[2px_2px_0_0_#E8E4D6] transform -rotate-2 hover:rotate-0' : 'bg-surface-container-low opacity-70 transform rotate-3 hover:rotate-0'}`}
           >
              {selectedPetId === pet.id && <div className="masking-tape top-[-8px] rotate-[-5deg]"></div>}
              <div className="aspect-square bg-surface-container overflow-hidden mb-2">
                {pet.photoBase64 ? (
                  <img src={pet.photoBase64} alt={pet.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">{pet.emoji}</div>
                )}
              </div>
              <p className="font-handwriting text-center text-ink-black text-xl">{pet.name}</p>
           </div>
        ))}
        
        <Link to="/pets">
           <div className="relative bg-transparent border-2 border-dashed border-outline-variant p-2 pb-6 w-28 flex-shrink-0 cursor-pointer flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-outline text-3xl mb-1">add</span>
              <p className="font-headline-md text-caption text-outline">Add Pet</p>
           </div>
        </Link>
      </div>

      {/* Progress Note */}
      {selectedPet && items.length > 0 && (
         <div className="flex items-center gap-4 mb-stack-md transform rotate-1 pl-4">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-stamp-red flex items-center justify-center bg-surface text-stamp-red font-handwriting text-2xl font-bold">
                {Math.round(completionRate)}%
            </div>
            <p className="font-handwriting text-2xl text-ink-black">
               {completionRate === 100 ? 'All Done! Great Job!' : `${Math.round(completionRate)}% Done! Keep going!`}
            </p>
         </div>
      )}

      {/* Checklist Card */}
      {pets.length === 0 ? (
          <div className="torn-paper p-6 md:p-8 rounded-sm mb-stack-lg mx-2 md:mx-0 max-w-2xl">
             <EmptyState title="반려동물을 등록해주세요" description="먼저 반려동물을 등록하면 오늘의 돌봄 체크리스트가 생성됩니다." action={<Link to="/pets"><Button>반려동물 등록하기</Button></Link>} />
          </div>
      ) : items.length === 0 ? (
          <div className="torn-paper p-6 md:p-8 rounded-sm mb-stack-lg mx-2 md:mx-0 max-w-2xl">
             <EmptyState emoji="📋" title="오늘의 루틴이 없어요" description="루틴을 추가하거나, 오늘 요일에 맞는 루틴을 설정해주세요." action={<Link to="/routines"><Button>루틴 추가하기</Button></Link>} />
          </div>
      ) : (
          <div className="torn-paper p-6 md:p-8 rounded-sm mb-stack-lg mx-2 md:mx-0 max-w-2xl">
             <h2 className="font-headline-lg text-headline-lg md:text-display-lg text-primary mb-stack-md flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">task_alt</span>
                Today's Care
             </h2>
             <ul className="space-y-0">
                {items.map((item) => (
                   <ChecklistItemCard key={item.routine.id} item={item} date={today} />
                ))}
             </ul>
             <Link to="/routines">
                <button className="mt-6 font-label-md text-label-md text-primary flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
                   <span className="material-symbols-outlined text-sm">add</span> Add an extra task today
                </button>
             </Link>
          </div>
      )}
    </Layout>
  );
}
