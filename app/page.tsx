'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TabPanel from './components/TabPanel';
import FilterModal from './components/FilterModal';
import FloatingActionButton from './components/FloatingActionButton';

export default function Home() {
  const [activeTab, setActiveTab] = useState('panel-all');
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [currentFilters, setCurrentFilters] = useState({
    sort: 'recommend',
    age: 'all',
    categories: [] as string[]
  });

  const postData = [
    { type: '모집중', title: '월간 반복 모임', group: '채팅팀', location: '서초4동', time: '1일 전' },
    { type: '모임 일정', title: '모임일정비밀인가!! ㅇㅇ', group: '인문학을이해하자', location: '서초4동', time: '4일 전' },
    { type: '자유 게시판', title: '모임에만 작성으로 게시글을 남겨보아요', group: 'GE작업 확인용 모임', location: '서초4동', time: '9일 전' },
    { type: '모집중', title: '병⚡️갑자기 시간이 비어버렸거나...', group: '랜덤 모임', location: '서초동', time: '15일 전' }
  ];

  const groupData = [
    { id: 1, name: '2030 신생모임 송파락(樂) 💛', desc: '함께 맛집, 카페 투어해요!', location: '송파/강동', members: 38, category: ['social'], age: ['20', '30'], popular: 8, new: 5, recommend: 1, isNew: true, imageUrl: 'https://placehold.co/64x64/3a3a3c/f2f2f7?text=락' },
    { id: 2, name: '송등모 | "송파등산" 친구 만들기', desc: '주말마다 가볍게 산에 올라요', location: '송파/광진', members: 58, category: ['sports'], age: ['all'], popular: 9, new: 2, recommend: 2, isNew: false, imageUrl: 'https://placehold.co/64x64/3a3a3c/f2f2f7?text=산' },
    { id: 3, name: '잠실 사이드 프로젝트', desc: 'React, Node.js 스터디', location: '잠실', members: 25, category: ['study'], age: ['20', '30', '40'], popular: 7, new: 8, recommend: 3, isNew: true, imageUrl: 'https://placehold.co/64x64/3a3a3c/f2f2f7?text=Dev' },
    { id: 4, name: '매일 저녁 댕댕이 산책모임', desc: '우리 댕댕이 사회성 길러주기', location: '잠실', members: 120, category: ['hobby'], age: ['all'], popular: 10, new: 1, recommend: 4, isNew: false, imageUrl: 'https://placehold.co/64x64/3a3a3c/f2f2f7?text=멍' },
    { id: 5, name: '송파 달리기 크루', desc: '퇴근 후 석촌호수 달려요', location: '송파', members: 76, category: ['sports'], age: ['20', '30'], popular: 6, new: 6, recommend: 5, isNew: false, imageUrl: 'https://placehold.co/64x64/3a3a3c/f2f2f7?text=Run' },
    { id: 7, name: '왕초보 주식 스터디', desc: '함께 공부해서 부자돼요!', location: '온라인', members: 95, category: ['study'], age: ['all'], popular: 4, new: 9, recommend: 7, isNew: true, imageUrl: 'https://placehold.co/64x64/3a3a3c/f2f2f7?text=$' }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleFilterChange = (newFilters: typeof currentFilters) => {
    setCurrentFilters(newFilters);
  };

  const handleModalOpen = (modalId: string) => {
    setOpenModal(modalId);
  };

  const handleModalClose = () => {
    setOpenModal(null);
  };

  return (
    <div className="flex justify-center items-start md:pt-10">
      <div className="app-container w-full max-w-md shadow-lg md:rounded-2xl overflow-hidden relative h-[844px] flex flex-col bg-[#1c1c1e] text-[#f2f2f7]">
        <Header />
        <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main className="flex-grow overflow-y-auto">
          <TabPanel
            activeTab={activeTab}
            postData={postData}
            groupData={groupData}
            currentFilters={currentFilters}
            onTabChange={handleTabChange}
            onModalOpen={handleModalOpen}
          />
        </main>

        <FloatingActionButton />

        {openModal && (
          <FilterModal
            modalId={openModal}
            currentFilters={currentFilters}
            onFilterChange={handleFilterChange}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}
