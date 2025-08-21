export default function FloatingActionButton() {
    return (
      <button 
        className="absolute bottom-6 right-6 bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-30 hover:bg-orange-600 transition-colors"
        onClick={() => console.log('FAB clicked')}
        aria-label="새 모임 만들기"
        title="새 모임 만들기"
      >
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    );
  }
  