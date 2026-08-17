import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, User, BookOpen, Layers } from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { LoadingState } from '../components/LoadingState';
import { SkillCard } from '../components/SkillCard';
import { SkillEvidenceModal } from '../components/SkillEvidenceModal';
import type { StudentSkillProfile, SkillItem } from '../data/skills';
import { getSkillPassport } from '../services/skillService';

export const SkillPassportPage: React.FC = () => {
  const [profile, setProfile] = useState<StudentSkillProfile | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await getSkillPassport();
      setProfile(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const categories = ['All', 'Programming', 'Web Development', 'Database', 'AI / ML', 'Tools'];

  return (
    <AppShell>
      {/* Page Header */}
      <div className="page-header-container">
        <div>
          <div className="breadcrumbs">
            <span>Career & Skills</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Skill Passport</span>
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Student Skill Passport</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Comprehensive technical skill profile with verified evidence from coursework, projects, and assessments.
          </p>
        </div>
      </div>

      {isLoading || !profile ? (
        <LoadingState message="Loading student skill passport profile..." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header Profile Summary Box */}
          <div className="card-box skill-passport-header-card">
            <div className="profile-header-main">
              <div className="avatar-circle-lg font-display">
                {profile.studentName.split(' ').map(n => n[0]).join('')}
              </div>

              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{profile.studentName}</h2>
                    <span className="font-mono text-dark-grey" style={{ fontSize: '0.85rem' }}>
                      USN: {profile.usn} • {profile.program}
                    </span>
                  </div>

                  <span className="badge badge-active font-mono" style={{ fontSize: '0.85rem', padding: '0.35rem 0.75rem' }}>
                    CGPA: {profile.cgpa.toFixed(2)}
                  </span>
                </div>

                <div className="profile-meta-row font-mono" style={{ marginTop: '0.75rem' }}>
                  <span>{profile.department}</span>
                  <span>•</span>
                  <span>{profile.semester}</span>
                </div>
              </div>
            </div>

            <div className="skill-stats-strip">
              <div className="strip-stat font-mono">
                <span className="stat-label">Total Verified Skills</span>
                <span className="stat-value text-orange">{profile.totalSkillsCount}</span>
              </div>
              <div className="strip-stat font-mono">
                <span className="stat-label">Evidence Items</span>
                <span className="stat-value text-blue">{profile.totalVerifiedEvidence}</span>
              </div>
              <div className="strip-stat font-mono">
                <span className="stat-label">Skill Verification</span>
                <span className="stat-value text-success">Verified</span>
              </div>
            </div>
          </div>

          {/* Category Selector Tabs */}
          <div className="category-tabs-container">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-item ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Skill Cards Grid */}
          <div className="skills-category-list">
            {profile.skillCategories
              .filter(cat => activeCategory === 'All' || cat.categoryName === activeCategory)
              .map((catGroup) => (
                <div key={catGroup.categoryName} className="skill-group-section mb-4">
                  <h3 className="section-title font-display mb-3" style={{ fontSize: '1.1rem' }}>
                    {catGroup.categoryName} Skills
                  </h3>

                  <div className="skills-grid">
                    {catGroup.skills.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                        onOpenEvidence={setSelectedSkill}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Skill Evidence Modal */}
      <SkillEvidenceModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </AppShell>
  );
};

export default SkillPassportPage;
