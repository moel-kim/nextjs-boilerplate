interface Post {
    type: string;
    title: string;
    group: string;
    location: string;
    time: string;
  }
  
  interface Group {
    id: number;
    name: string;
    desc: string;
    location: string;
    members: number;
    category: string[];
    age: string[];
    popular: number;
    new: number;
    recommend: number;
    isNew: boolean;
    imageUrl: string;
  }
  
  interface TabPanelProps {
    activeTab: string;
    postData: Post[];
    groupData: Group[];
    currentFilters: {
      sort: string;
      age: string;
      categories: string[];
    };
    onTabChange: (tabId: string) => void;
    onModalOpen?: (modalId: string) => void;
  }
  
  export default function TabPanel({ 
    activeTab, 
    postData, 
    groupData, 
    currentFilters, 
    onTabChange,
    onModalOpen
  }: TabPanelProps) {
    const renderPosts = (limit = 0) => {
      const data = limit > 0 ? postData.slice(0, limit) : postData;
      return data.map((post, index) => (
        <div key={index} className="pb-4 border-b border-gray-800">
          <span className="text-xs text-orange-400 font-semibold">{post.type}</span>
          <p className="font-semibold text-base my-1 text-gray-200">{post.title}</p>
          <p className="text-xs text-gray-500">{post.group} · {post.location} · {post.time}</p>
        </div>
      ));
    };
  
    const renderGroups = (limit = 0) => {
      let filteredData = [...groupData];
      
      if (currentFilters.age !== 'all') {
        filteredData = filteredData.filter(g => 
          g.age.includes(currentFilters.age) || g.age.includes('all')
        );
      }
      
      if (currentFilters.categories.length > 0) {
        filteredData = filteredData.filter(g => 
          g.category.some(cat => currentFilters.categories.includes(cat))
        );
      }
      
      switch(currentFilters.sort) {
        case 'new':
          filteredData.sort((a, b) => a.new - b.new);
          break;
        case 'popular':
          filteredData.sort((a, b) => b.members - a.members);
          break;
        default:
          filteredData.sort((a, b) => a.recommend - b.recommend);
          break;
      }
      
      const dataToRender = limit > 0 ? filteredData.slice(0, limit) : filteredData;
      
      return dataToRender.map((group) => (
        <div key={group.id} className="flex items-start">
          <img src={group.imageUrl} alt="모임 썸네일" className="w-16 h-16 rounded-lg mr-4" />
          <div className="flex-grow">
            <p className="font-bold text-base mb-1 text-gray-200">{group.name}</p>
            <p className="text-sm text-gray-400 mb-2">{group.desc}</p>
            <p className="text-xs text-gray-500">
              {group.location} · {group.members}명 
              {group.isNew && <span className="text-orange-400 font-semibold"> · 신규</span>}
            </p>
          </div>
        </div>
      ));
    };
  
    const getFilterButtonText = () => {
      const ageText = currentFilters.age === 'all' ? '모집 연령대' : `${currentFilters.age}대`;
      const catText = currentFilters.categories.length === 0 ? '카테고리' : `카테고리 ${currentFilters.categories.length}`;
      const sortMap: { [key: string]: string } = { recommend: '추천순', popular: '인기순', new: '최신순' };
      
      return {
        age: `${ageText} ∨`,
        category: `${catText} ∨`,
        sort: `${sortMap[currentFilters.sort]} ∨`
      };
    };
  
    return (
      <>
        <div id="panel-all" className={`tab-panel p-4 ${activeTab === 'panel-all' ? '' : 'hidden'}`}>
          <section className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">게시글</h2>
              <button 
                onClick={() => onTabChange('panel-posts')}
                className="tab-link text-sm text-gray-400 font-semibold hover:text-gray-300"
              >
                더보기 &gt;
              </button>
            </div>
            <div className="space-y-4">
              {renderPosts(2)}
            </div>
          </section>
          
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">모임</h2>
              <button 
                onClick={() => onTabChange('panel-groups')}
                className="tab-link text-sm text-gray-400 font-semibold hover:text-gray-300"
              >
                더보기 &gt;
              </button>
            </div>
            <div className="space-y-4">
              {renderGroups(3)}
            </div>
          </section>
        </div>
  
        <div id="panel-posts" className={`tab-panel p-4 ${activeTab === 'panel-posts' ? '' : 'hidden'}`}>
          <div className="space-y-4">
            {renderPosts()}
          </div>
        </div>
  
        <div id="panel-groups" className={`tab-panel ${activeTab === 'panel-groups' ? 'flex flex-col h-full' : 'hidden'}`}>
          <div className="p-4 pb-2">
            <div className="flex space-x-2 text-sm">
              <button 
                onClick={() => onModalOpen?.('modal-region')}
                className="filter-btn flex-1 bg-gray-800 border border-gray-700 rounded-full px-3 py-1.5 truncate hover:bg-gray-700"
              >
                전국 ∨
              </button>
              <button 
                onClick={() => onModalOpen?.('modal-age')}
                className={`filter-btn flex-1 border rounded-full px-3 py-1.5 truncate transition-colors ${
                  currentFilters.age !== 'all'
                    ? 'bg-[#4a4a4c] text-white border-[#6a6a6c]'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                }`}
              >
                {getFilterButtonText().age}
              </button>
              <button 
                onClick={() => onModalOpen?.('modal-category')}
                className={`filter-btn flex-1 border rounded-full px-3 py-1.5 truncate transition-colors ${
                  currentFilters.categories.length > 0
                    ? 'bg-[#4a4a4c] text-white border-[#6a6a6c]'
                    : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                }`}
              >
                {getFilterButtonText().category}
              </button>
              <button 
                onClick={() => onModalOpen?.('modal-sort')}
                className="filter-btn flex-1 bg-gray-800 border border-gray-700 rounded-full px-3 py-1.5 truncate hover:bg-gray-700"
              >
                {getFilterButtonText().sort}
              </button>
            </div>
          </div>
          <div className="list-container space-y-4 p-4 flex-grow overflow-y-auto">
            {renderGroups()}
          </div>
        </div>
      </>
    );
  }
  