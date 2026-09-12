import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { StudentResult, SubjectScore } from '../../types/school';
import { ResultSheetModal } from '../result/ResultSheetModal';
import {
  PlusCircle,
  FileSpreadsheet,
  Download,
  Upload,
  Printer,
  Trash2,
  Search,
  CheckCircle,
  Sparkles,
  Calculator,
  X,
  GraduationCap,
} from 'lucide-react';

export const AdminResults: React.FC = () => {
  const { config, results, addResult, deleteResult, generatePin, showToast } =
    useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedResultForSheet, setSelectedResultForSheet] =
    useState<StudentResult | null>(null);

  // Form State for Adding New Result
  const defaultSubjects: SubjectScore[] = [
    {
      id: '1',
      subjectName: 'English Language',
      ca1: 18,
      ca2: 17,
      exam: 52,
      total: 87,
      grade: 'A1',
      remark: 'Excellent',
    },
    {
      id: '2',
      subjectName: 'Mathematics',
      ca1: 17,
      ca2: 16,
      exam: 49,
      total: 82,
      grade: 'A1',
      remark: 'Distinction',
    },
    {
      id: '3',
      subjectName: 'Basic Science & Tech',
      ca1: 16,
      ca2: 15,
      exam: 48,
      total: 79,
      grade: 'A1',
      remark: 'Very Good',
    },
    {
      id: '4',
      subjectName: 'Civic Education',
      ca1: 18,
      ca2: 18,
      exam: 50,
      total: 86,
      grade: 'A1',
      remark: 'Commendable',
    },
    {
      id: '5',
      subjectName: 'Computer Studies (ICT)',
      ca1: 19,
      ca2: 18,
      exam: 54,
      total: 91,
      grade: 'A1',
      remark: 'Outstanding',
    },
  ];

  const [formData, setFormData] = useState({
    studentName: '',
    regNumber: `REG/${new Date().getFullYear()}/${100 + results.length + 1}`,
    classLevel: 'JSS 2',
    term: config.currentTerm || '2nd Term',
    session: config.academicSession || '2025/2026',
    gender: 'Male',
    position: '1st out of 38',
    teacherRemark: 'Remarkable diligence and active class participation.',
    principalRemark: 'Outstanding terminal performance. Keep up the high standard.',
    nextTermResumptionDate: 'September 15, 2026',
  });

  const [subjects, setSubjects] = useState<SubjectScore[]>(defaultSubjects);

  // Calculate grade helper
  const computeGrade = (total: number): { grade: string; remark: string } => {
    if (total >= 75) return { grade: 'A1', remark: 'Distinction' };
    if (total >= 70) return { grade: 'B2', remark: 'Very Good' };
    if (total >= 65) return { grade: 'B3', remark: 'Good' };
    if (total >= 60) return { grade: 'C4', remark: 'Credit' };
    if (total >= 50) return { grade: 'C5', remark: 'Credit' };
    if (total >= 45) return { grade: 'D7', remark: 'Pass' };
    if (total >= 40) return { grade: 'E8', remark: 'Fair' };
    return { grade: 'F9', remark: 'Fail' };
  };

  // Update subject score
  const handleScoreChange = (
    index: number,
    field: 'ca1' | 'ca2' | 'exam',
    value: number
  ) => {
    const updated = [...subjects];
    const sub = { ...updated[index], [field]: Math.max(0, value) };
    sub.total = (sub.ca1 || 0) + (sub.ca2 || 0) + (sub.exam || 0);
    const evaluation = computeGrade(sub.total);
    sub.grade = evaluation.grade;
    sub.remark = evaluation.remark;
    updated[index] = sub;
    setSubjects(updated);
  };

  const handleSubjectNameChange = (index: number, name: string) => {
    const updated = [...subjects];
    updated[index].subjectName = name;
    setSubjects(updated);
  };

  const handleAddSubjectRow = () => {
    setSubjects([
      ...subjects,
      {
        id: Date.now().toString(),
        subjectName: 'New Subject',
        ca1: 15,
        ca2: 15,
        exam: 45,
        total: 75,
        grade: 'A1',
        remark: 'Good',
      },
    ]);
  };

  const handleRemoveSubjectRow = (index: number) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((_, i) => i !== index));
    }
  };

  // Auto computations
  const totalScore = subjects.reduce((sum, s) => sum + s.total, 0);
  const averageScore =
    subjects.length > 0
      ? Number((totalScore / subjects.length).toFixed(1))
      : 0;
  const overallGrade = computeGrade(averageScore).grade;

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.regNumber.trim()) {
      alert('Please fill student name and registration number.');
      return;
    }

    addResult({
      studentName: formData.studentName,
      regNumber: formData.regNumber.toUpperCase().trim(),
      classLevel: formData.classLevel,
      term: formData.term,
      session: formData.session,
      gender: formData.gender,
      subjects,
      totalScore,
      averageScore,
      grade: overallGrade,
      position: formData.position,
      teacherRemark: formData.teacherRemark,
      principalRemark: formData.principalRemark,
      nextTermResumptionDate: formData.nextTermResumptionDate,
    });

    // Auto generate a PIN for this student
    const newPin = generatePin(1);
    showToast(`Result saved! PIN generated: ${newPin[0]?.pin || 'Ready'}`);
    setShowAddModal(false);
  };

  // CSV Template Download
  const handleDownloadCSVTemplate = () => {
    const csvHeader =
      'RegNumber,StudentName,Class,Term,Session,English_Total,Maths_Total,Science_Total,ICT_Total,Position\nREG/2026/105,David Adeleke,JSS 1,2nd Term,2025/2026,84,78,92,88,3rd out of 35\nREG/2026/106,Amara Chukwu,SSS 1,2nd Term,2025/2026,90,85,82,95,1st out of 40';

    const blob = new Blob([csvHeader], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'student_results_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded sample CSV result template!');
  };

  // CSV File Upload Handler
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      const lines = text.split('\n').filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        alert('CSV file is empty or missing data rows.');
        return;
      }

      let importedCount = 0;
      // Skip header, process rows
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',').map((c) => c.trim().replace(/^"|"$/g, ''));
        if (cols.length >= 3) {
          const [reg, name, cls, term, session, eng, mth, sci, ict, pos] = cols;
          const engScore = Number(eng) || 75;
          const mthScore = Number(mth) || 70;
          const sciScore = Number(sci) || 72;
          const ictScore = Number(ict) || 80;

          const importedSubjects: SubjectScore[] = [
            {
              id: '1',
              subjectName: 'English Language',
              ca1: Math.round(engScore * 0.4 * 0.5),
              ca2: Math.round(engScore * 0.4 * 0.5),
              exam: Math.round(engScore * 0.6),
              total: engScore,
              grade: computeGrade(engScore).grade,
              remark: computeGrade(engScore).remark,
            },
            {
              id: '2',
              subjectName: 'Mathematics',
              ca1: Math.round(mthScore * 0.4 * 0.5),
              ca2: Math.round(mthScore * 0.4 * 0.5),
              exam: Math.round(mthScore * 0.6),
              total: mthScore,
              grade: computeGrade(mthScore).grade,
              remark: computeGrade(mthScore).remark,
            },
            {
              id: '3',
              subjectName: 'Basic Science',
              ca1: Math.round(sciScore * 0.4 * 0.5),
              ca2: Math.round(sciScore * 0.4 * 0.5),
              exam: Math.round(sciScore * 0.6),
              total: sciScore,
              grade: computeGrade(sciScore).grade,
              remark: computeGrade(sciScore).remark,
            },
            {
              id: '4',
              subjectName: 'Computer Studies',
              ca1: Math.round(ictScore * 0.4 * 0.5),
              ca2: Math.round(ictScore * 0.4 * 0.5),
              exam: Math.round(ictScore * 0.6),
              total: ictScore,
              grade: computeGrade(ictScore).grade,
              remark: computeGrade(ictScore).remark,
            },
          ];

          const tot = engScore + mthScore + sciScore + ictScore;
          const avg = Number((tot / 4).toFixed(1));

          addResult({
            studentName: name,
            regNumber: reg.toUpperCase(),
            classLevel: cls || 'JSS 1',
            term: term || config.currentTerm,
            session: session || config.academicSession,
            subjects: importedSubjects,
            totalScore: tot,
            averageScore: avg,
            grade: computeGrade(avg).grade,
            position: pos || 'Active',
            teacherRemark: 'Good terminal performance.',
            principalRemark: 'Keep up the good progress.',
          });
          importedCount++;
        }
      }

      showToast(`Successfully imported ${importedCount} results from CSV!`);
    };
    reader.readAsText(file);
  };

  const filteredResults = results.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.classLevel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-serif-heading text-slate-900">
            Student Academic Results Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Publish continuous assessment scores, print official terminal report sheets, and import via CSV.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadCSVTemplate}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
            title="Download CSV spreadsheet template"
          >
            <Download size={14} />
            <span>CSV Template</span>
          </button>

          <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold transition cursor-pointer">
            <Upload size={14} />
            <span>Upload CSV</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
          >
            <PlusCircle size={15} />
            <span>Add Student Result</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by student name, Reg Number, or class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-800 focus:outline-none"
          />
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
        </div>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
          Total: <strong>{results.length}</strong> student results recorded
        </span>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-semibold">
                <th className="py-3 px-4">Reg Number</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Term / Session</th>
                <th className="py-3 px-4 text-center">Total Score</th>
                <th className="py-3 px-4 text-center">Average %</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-center">Position</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResults.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-mono font-bold text-blue-900">
                    {res.regNumber}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {res.studentName}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">
                    {res.classLevel}
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {res.term} ({res.session})
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">
                    {res.totalScore}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-blue-900">
                    {res.averageScore}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-xs font-bold text-[11px] bg-emerald-100 text-emerald-800">
                      {res.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-700 font-medium">
                    {res.position}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedResultForSheet(res)}
                        className="inline-flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                        title="View and Print Result Sheet"
                      >
                        <Printer size={13} />
                        <span>Print Sheet</span>
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Delete result for "${res.studentName}"?`
                            )
                          ) {
                            deleteResult(res.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 transition cursor-pointer"
                        title="Delete Result"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Result Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-blue-900 tracking-wider">
                  Academic Assessment Form
                </span>
                <h3 className="text-xl font-bold font-serif-heading text-slate-900">
                  Compute & Add New Student Result
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveResult} className="space-y-6">
              {/* Student Bio Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ebube Miracle Eze"
                    value={formData.studentName}
                    onChange={(e) =>
                      setFormData({ ...formData, studentName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.regNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, regNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs uppercase font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Class Level *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.classLevel}
                    onChange={(e) =>
                      setFormData({ ...formData, classLevel: e.target.value })
                    }
                    placeholder="e.g. JSS 2 or SSS 1"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Term
                  </label>
                  <input
                    type="text"
                    value={formData.term}
                    onChange={(e) =>
                      setFormData({ ...formData, term: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Academic Session
                  </label>
                  <input
                    type="text"
                    value={formData.session}
                    onChange={(e) =>
                      setFormData({ ...formData, session: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Class Position
                  </label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    placeholder="e.g. 1st out of 40"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              {/* Subject Breakdown Builder */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                    Subject Assessment Breakdown
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddSubjectRow}
                    className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1 cursor-pointer"
                  >
                    <PlusCircle size={14} />
                    <span>Add Another Subject</span>
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-2.5">Subject Name</th>
                        <th className="p-2.5 text-center">CA 1 (20)</th>
                        <th className="p-2.5 text-center">CA 2 (20)</th>
                        <th className="p-2.5 text-center">Exam (60)</th>
                        <th className="p-2.5 text-center">Total</th>
                        <th className="p-2.5 text-center">Grade</th>
                        <th className="p-2.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {subjects.map((sub, idx) => (
                        <tr key={sub.id || idx}>
                          <td className="p-2">
                            <input
                              type="text"
                              value={sub.subjectName}
                              onChange={(e) =>
                                handleSubjectNameChange(idx, e.target.value)
                              }
                              className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={sub.ca1}
                              onChange={(e) =>
                                handleScoreChange(
                                  idx,
                                  'ca1',
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-14 px-2 py-1 border border-slate-200 rounded text-xs text-center font-mono"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              min="0"
                              max="20"
                              value={sub.ca2}
                              onChange={(e) =>
                                handleScoreChange(
                                  idx,
                                  'ca2',
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-14 px-2 py-1 border border-slate-200 rounded text-xs text-center font-mono"
                            />
                          </td>
                          <td className="p-2 text-center">
                            <input
                              type="number"
                              min="0"
                              max="60"
                              value={sub.exam}
                              onChange={(e) =>
                                handleScoreChange(
                                  idx,
                                  'exam',
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="w-14 px-2 py-1 border border-slate-200 rounded text-xs text-center font-mono"
                            />
                          </td>
                          <td className="p-2 text-center font-bold font-mono">
                            {sub.total}
                          </td>
                          <td className="p-2 text-center font-bold text-blue-900">
                            {sub.grade}
                          </td>
                          <td className="p-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveSubjectRow(idx)}
                              className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                            >
                              <Trash2 size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Auto summary box */}
                <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-200 flex items-center justify-between text-xs font-semibold text-blue-950">
                  <span>
                    Auto-Calculated Total: <strong>{totalScore}</strong>
                  </span>
                  <span>
                    Average: <strong>{averageScore}%</strong>
                  </span>
                  <span>
                    Overall Grade: <strong>{overallGrade}</strong>
                  </span>
                </div>
              </div>

              {/* Remarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Form Teacher's Remark
                  </label>
                  <input
                    type="text"
                    value={formData.teacherRemark}
                    onChange={(e) =>
                      setFormData({ ...formData, teacherRemark: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Principal's Remark
                  </label>
                  <input
                    type="text"
                    value={formData.principalRemark}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        principalRemark: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-950 shadow-md cursor-pointer"
                >
                  Save Result & Generate Scratchcard PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Result Sheet Modal */}
      {selectedResultForSheet && (
        <ResultSheetModal
          result={selectedResultForSheet}
          onClose={() => setSelectedResultForSheet(null)}
        />
      )}
    </div>
  );
};
