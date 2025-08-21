interface NavigationProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
  }
  
  export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
    return (
      <>
        <nav className="nav-l1 sticky top-[61px] z-20 flex justify-around text-sm font-semibold text-gray-500 border-b border-gray-800 bg-[#1c1c1e]">
          <a href="#" className="py-3 px-2">통합</a>
          <a href="#" className="py-3 px-2">동네생활</a>
          <a href="#" className="py-3 px-2 text-orange-500 border-b-2 border-orange-500">모임</a>
          <a href="#" className="py-3 px-2">중고거래</a>
          <a href="#" className="py-3 px-2">동네업체</a>
        </nav>
  
        <nav className="nav-l2 sticky top-[105px] z-20 flex text-md font-semibold text-gray-500 border-b border-gray-800 bg-[#1c1c1e]">
          <button 
            onClick={() => onTabChange('panel-all')}
            className={`sub-nav-link flex-1 text-center py-3 border-b-2 transition-colors ${
              activeTab === 'panel-all' 
                ? 'text-[#f2f2f7] font-bold border-[#f2f2f7]' 
                : 'border-transparent'
            }`}
          >
            전체
          </button>
          <button 
            onClick={() => onTabChange('panel-posts')}
            className={`sub-nav-link flex-1 text-center py-3 border-b-2 transition-colors ${
              activeTab === 'panel-posts' 
                ? 'text-[#f2f2f7] font-bold border-[#f2f2f7]' 
                : 'border-transparent'
            }`}
          >
            게시글
          </button>
          <button 
            onClick={() => onTabChange('panel-groups')}
            className={`sub-nav-link flex-1 text-center py-3 border-b-2 transition-colors ${
              activeTab === 'panel-groups' 
                ? 'text-[#f2f2f7] font-bold border-[#f2f2f7]' 
                : 'border-transparent'
            }`}
          >
            모임
          </button>
        </nav>
      </>
    );
  }
  