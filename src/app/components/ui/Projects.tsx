"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Project } from "@/app/interfaces";
import { 
  FaCode, FaExternalLinkAlt, FaGithub, FaArrowDown, FaArrowUp, 
  FaTimes, FaArrowLeft, FaArrowRight 
} from "react-icons/fa";

const Projects = ({ data }: { data: Project[] }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const hasMoreProjects = data.length > 3;
  
  const displayedProjects = showAll ? data : data.slice(0, 3);


  const handleNextImage = useCallback(() => {
    if (!selectedProject?.images) return;
    setCurrentImageIndex(prev => 
      prev < selectedProject.images.length - 1 ? prev + 1 : 0
    );
  }, [selectedProject]);

  const handlePrevImage = useCallback(() => {
    if (!selectedProject?.images) return;
    setCurrentImageIndex(prev => 
      prev > 0 ? prev - 1 : selectedProject.images.length - 1
    );
  }, [selectedProject]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'auto';
  }, []);
  
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedProject(null);
  //   setCurrentImageIndex(0);
  //   document.body.style.overflow = 'auto';
  // };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') handlePrevImage()
      if (e.key === 'ArrowRight') handleNextImage()
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal, handleNextImage, handlePrevImage]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    if (showAll && projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showAll]);


  const modalTags = selectedProject?.tags.join(' • ') || '';

  return (
    <section id="projects" className="py-20" ref={projectsRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent inline-block text-transparent bg-clip-text">
            Featured Projects
          </h2>
          <div className="block w-20 h-1 bg-gradient-to-r from-primary to-accent rounded mx-auto mt-3"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openProjectModal(project)}
              className="bg-card backdrop-blur-sm border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col h-full cursor-pointer group"
            >
              {/* Project Image */}
              <div className="h-48 bg-inputfield relative">
                {project.coverImage ? (
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${project.coverImage})` }}
                  ></div>
                ) : (
                  <div className="w-full h-full bg-inputfield flex items-center justify-center">
                    <div className="text-white text-4xl">
                      <FaCode />
                    </div>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-text-secondary dark:text-text-secondary-dark mb-4 line-clamp-2">
                  {project.overview.length > 100 ? `${project.overview.slice(0,99)}...`: project.overview}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary dark:text-primary-dark text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 flex justify-between" onClick={e => e.stopPropagation()}>
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-primary/20 transition-colors"
                    aria-label="GitHub repository"
                  >
                    <FaGithub className="text-lg" />
                    <span>GitHub</span>
                  </a>
                ) : (
                  <div className="opacity-50 cursor-not-allowed flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <FaGithub className="text-lg" />
                    <span>GitHub</span>
                  </div>
                )}

                {project.liveDemo ? (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-primary/20 transition-colors"
                    aria-label="Live demo"
                  >
                    <FaExternalLinkAlt className="text-lg" />
                    <span>Live Demo</span>
                  </a>
                ) : (
                  <div className="opacity-50 cursor-not-allowed flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <FaExternalLinkAlt className="text-lg" />
                    <span>Live Demo</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {hasMoreProjects && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-primary text-white font-medium rounded-lg hover:opacity-90 transition-opacity group"
            >
              {showAll ? (
                <>
                  Show Less
                  <FaArrowUp className="group-hover:-translate-y-0.5 transition-transform" />
                </>
              ) : (
                <>
                  Show More
                  <FaArrowDown className="group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
            
            <p className="mt-2 text-sm text-text-secondary dark:text-text-secondary-dark">
              {showAll 
                ? `Showing all ${data.length} projects` 
                : `Showing 3 of ${data.length} projects`}
            </p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
          <div 
            ref={modalRef}
            className="relative bg-surface dark:bg-surface-dark rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-border dark:border-border-dark flex justify-between items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-dark">
                  {selectedProject.title}
                </h3>
                <p className="text-text-secondary dark:text-text-secondary-dark mt-2">
                  {modalTags}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark transition-colors p-2"
                aria-label="Close modal"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            {/* Modal Body - Scrollable Content */}
            <div className="overflow-y-auto flex-grow">
              {/* Image Carousel */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="relative">
                  <div className="h-64 md:h-96 w-full bg-inputfield">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${selectedProject.images[currentImageIndex]})` }}
                    ></div>
                  </div>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <FaArrowLeft />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Next image"
                  >
                    <FaArrowRight />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </div>
                </div>
              )}
              
              {/* Project Details */}
              <div className="p-6">
                <h4 className="text-xl font-bold mb-4">Project Overview</h4>
                <p className="text-text-secondary dark:text-text-secondary-dark mb-6">
                  {selectedProject.overview}
                </p>
                
                {selectedProject.desc && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Detailed Description</h4>
                    <p className="text-text-secondary dark:text-text-secondary-dark">
                      {selectedProject.desc}
                    </p>
                  </div>
                )}
                
                {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                    <ul className="list-disc pl-6 space-y-2 text-text-secondary dark:text-text-secondary-dark">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-border dark:border-border-dark flex flex-wrap gap-4 justify-between">
              <div className="flex flex-wrap gap-3">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-primary/20 transition-colors"
                    aria-label="GitHub repository"
                  >
                    <FaGithub className="text-lg" />
                    <span>GitHub Repository</span>
                  </a>
                )}
                
                {selectedProject.liveDemo && (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-primary/20 transition-colors"
                    aria-label="Live demo"
                  >
                    <FaExternalLinkAlt className="text-lg" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
              
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gradient-to-r from-primary to-primary text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Close Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;