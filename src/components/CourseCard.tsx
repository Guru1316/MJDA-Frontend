/* eslint-disable react-hooks/purity */
import React from 'react';

export interface Course {
  _id?: string;
  emoji: string;
  name: string;
  level: string;
  duration: string;
  students?: number;
  price: string;
  desc: string;
  color: string;
}

interface CourseCardProps {
  course: Course;
  index: number;
  onApply: (courseName: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index, onApply }) => {
  return (
    <div 
      className="bg-[rgba(28,28,40,.6)] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-(--gold) hover:shadow-[0_20px_50px_rgba(0,0,0,.4)] flex flex-col"
      style={{
        animation: `fadeUp 0.6s ease forwards ${index * 0.08}s`,
        opacity: 0,
        transform: 'translateY(30px)'
      }}
    >
      <div 
        className="h-55 flex items-center justify-center relative overflow-hidden group"
        style={{ background: `linear-gradient(135deg, ${course.color}33, ${course.color}11)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.15),transparent)]"></div>
        <span className="text-[6rem] z-10 transition-transform duration-500 group-hover:scale-110">{course.emoji}</span>
        
        <div className="absolute top-4 right-4 bg-black/40 border border-white/10 px-3 py-1.5 rounded-full text-xs text-white font-medium backdrop-blur-md z-20">
          {course.level}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3 text-white">{course.name}</h3>
        <p className="text-white/55 leading-relaxed mb-5 min-h-18.75 text-sm">
          {course.desc}
        </p>

        <div className="flex justify-between mb-5 text-white/45 text-sm pb-5 border-b border-white/5">
          <span>⏱ {course.duration}</span>
          <span>👥 {course.students || Math.floor(Math.random() * 60 + 40)} students</span>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-(--gold)">{course.price}</span>
          <button 
            onClick={() => onApply(course.name)}
            className="btn-gold px-5 py-2.5 rounded-xl text-sm font-semibold border-none cursor-pointer"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;