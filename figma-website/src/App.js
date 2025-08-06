// App.js
import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// Online placeholder images
const profileImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';
const educationImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
const experienceImage = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
const skillsImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
const projectsImage = 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
const certificationsImage = 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

// Resume Data
const resumeData = {
  // ... (keep the same resumeData object from previous code)
};

// Navbar Component
const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Aedavelli Sai Shankar</div>
      <div className="navbar-links">
        <button onClick={() => scrollToSection('personal')}>About</button>
        <button onClick={() => scrollToSection('education')}>Education</button>
        <button onClick={() => scrollToSection('experience')}>Experience</button>
        <button onClick={() => scrollToSection('skills')}>Skills</button>
        <button onClick={() => scrollToSection('projects')}>Projects</button>
        <button onClick={() => scrollToSection('certifications')}>Certifications</button>
      </div>
    </nav>
  );
};

// Floating Particles Background
const ParticlesBackground = () => {
  return (
    <div className="particles">
      {[...Array(30)].map((_, i) => (
        <div 
          key={i} 
          className="particle" 
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}
    </div>
  );
};

// Card Component
const Card = ({ title, children, id, color, image }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef} 
      id={id} 
      className={`card ${color || ''} ${isVisible ? 'animate' : ''}`}
    >
      {image && (
        <div className="card-image-container">
          <img src={image} alt={title} className="card-image" />
        </div>
      )}
      <div className="card-content-wrapper">
        <h3 className="card-title">{title}</h3>
        <div className="card-content">
          {children}
        </div>
      </div>
    </div>
  );
};

// ProgressBar Component
const ProgressBar = ({ skill, level }) => {
  const progressRef = useRef(null);
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let start = 0;
            const duration = 1500;
            const increment = level / (duration / 16);
            
            const animate = () => {
              start += increment;
              if (start >= level) {
                setAnimatedLevel(level);
                return;
              }
              setAnimatedLevel(Math.floor(start));
              requestAnimationFrame(animate);
            };
            
            animate();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, [level]);

  return (
    <div className="skill-item" ref={progressRef}>
      <div className="skill-info">
        <span className="skill-name">{skill}</span>
        <span className="skill-percent">{animatedLevel}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${animatedLevel}%` }}
        ></div>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, items, id, color, renderItem, image }) => {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      <Card title={title} id={id} color={color} image={image}>
        <ul className="section-list">
          {items.map((item, index) => (
            <li key={index} className="section-item">
              {renderItem ? renderItem(item) : (
                <>
                  <strong>{item.title || item.degree || item.company}</strong>
                  <div>{item.institution || item.issuer || item.position}</div>
                  <div>{item.location || item.technologies}</div>
                  <div>{item.date || `${item.startDate} - ${item.endDate}`}</div>
                  {item.package && <div>Package: {item.package}</div>}
                </>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <ParticlesBackground />
      <Navbar />
      
      <div className="portfolio-container">
        {/* Hero Section */}
        <section className="hero-section" id="home">
          {/* ... (keep the same hero section JSX from previous code) */}
        </section>

        {/* About Section */}
        <Card 
          id="personal" 
          title="About Me" 
          color="blue-card"
          image={profileImage}
        >
          {/* ... (keep the same about section JSX from previous code) */}
        </Card>

        {/* Education Section */}
        <Section
          id="education"
          title="Education"
          items={resumeData.education}
          color="green-card"
          image={educationImage}
          renderItem={(item) => (
            <div className="education-item">
              <h4 className="education-degree">{item.degree}</h4>
              <div className="education-institution">{item.institution}</div>
              <div className="education-location">{item.location}</div>
              <div className="education-date">{item.date}</div>
              <p className="education-description">{item.description}</p>
            </div>
          )}
        />

        {/* Experience Section */}
        <Section
          id="experience"
          title="Experience"
          items={resumeData.experience}
          color="purple-card"
          image={experienceImage}
          renderItem={(item) => (
            <div className="experience-item">
              <div className="experience-header">
                {item.logo && <img src={item.logo} alt={item.company} className="company-logo" />}
                <div>
                  <h4 className="experience-position">{item.position}</h4>
                  <div className="experience-company">{item.company}</div>
                  <div className="experience-date">{item.startDate} - {item.endDate}</div>
                </div>
              </div>
              <ul className="experience-responsibilities">
                {item.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
              <div className="experience-technologies">
                <strong>Technologies:</strong> {item.technologies}
              </div>
              <div className="experience-package">
                <strong>Package:</strong> {item.package}
              </div>
            </div>
          )}
        />

        {/* Skills Section */}
        <Card 
          id="skills" 
          title="Skills" 
          color="orange-card"
          image={skillsImage}
        >
          <div className="skills-container">
            <div className="technical-skills">
              <h4>Technical Skills</h4>
              {resumeData.skills.technical.map((skill, index) => (
                <ProgressBar key={index} skill={skill.name} level={skill.level} />
              ))}
            </div>
            <div className="professional-skills">
              <h4>Professional Skills</h4>
              <div className="skill-tags">
                {resumeData.skills.professional.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Projects Section */}
        <Section
          id="projects"
          title="Projects"
          items={resumeData.projects}
          color="red-card"
          image={projectsImage}
          renderItem={(item) => (
            <div className="project-item">
              <div className="project-content">
                <h4 className="project-title">{item.title}</h4>
                <div className="project-date">{item.date}</div>
                <p className="project-description">{item.description}</p>
                <div className="project-technologies">
                  {item.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              {item.image && (
                <div className="project-image">
                  <img src={item.image} alt={item.title} />
                </div>
              )}
            </div>
          )}
        />

        {/* Certifications Section */}
        <Section
          id="certifications"
          title="Certifications"
          items={resumeData.certifications}
          color="teal-card"
          image={certificationsImage}
          renderItem={(item) => (
            <div className="certification-item">
              {item.badge && (
                <div className="certification-badge">
                  <img src={item.badge} alt={item.title} />
                </div>
              )}
              <div className="certification-details">
                <h4 className="certification-title">{item.title}</h4>
                <div className="certification-issuer">{item.issuer}</div>
                <div className="certification-date">{item.date}</div>
              </div>
            </div>
          )}
        />

        {/* Footer */}
        <footer className="portfolio-footer">
          {/* ... (keep the same footer JSX from previous code) */}
        </footer>
      </div>
    </div>
  );
}

export default App;