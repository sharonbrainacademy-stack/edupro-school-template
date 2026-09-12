import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Award, Users, BookOpen } from 'lucide-react';

export const TeachersSection: React.FC = () => {
  const { teachers } = useSchool();

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Users size={14} className="text-amber-600" />
            <span>Academic Faculty</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-slate-900">
            Guided by Seasoned Educators
          </h2>
          <p className="text-slate-600 text-base">
            Our certified teachers bring decades of pedagogical excellence, passion, and mentorship to ensure every learner achieves their best.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="h-60 overflow-hidden bg-slate-100 relative">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-serif-heading font-bold text-slate-900 text-base leading-snug">
                    {teacher.name}
                  </h4>
                  <p className="text-xs font-semibold text-blue-800 mt-0.5">
                    {teacher.role}
                  </p>
                  <p className="text-[11px] text-amber-700 font-medium mt-1">
                    {teacher.qualification}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {teacher.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
