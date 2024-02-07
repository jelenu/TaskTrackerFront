import { CardInfo } from './CardInfo';

export const Card = ({ card, onUpdateCardTitle, onUpdateCardDescription, snapshot, showPopup, setShowPopup }) => {
  const handleButtonClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div 
      onClick={handleButtonClick}
        className={` font-bold text-white hover:bg-indigo-400 mt-3 rounded-xl h-9 pl-2 flex items-center w-auto ${
          snapshot.isDragging ? 'rotate-6 bg-indigo-400' : 'bg-indigo-500'
        }`}
      >
        <p>{card.title}</p>
      </div>
      {showPopup && (
        <CardInfo card={card} onUpdateCardTitle={onUpdateCardTitle} onUpdateCardDescription={onUpdateCardDescription} onClose={handleButtonClick} />
      )}
    </>
    
  );
};
