import { AboutInfo, Award, HeroText, Project, Route, SkillSet, Testimonial } from "../interfaces"
import { FaBrain, FaAtom, FaRobot, FaShieldAlt, FaMicrochip, FaVrCardboard, FaNetworkWired, FaDna } from 'react-icons/fa';

// Usiguze hii part !
const routes: Route[] = [
    { id: 1, path: 'Home' },
    { id: 2, path: 'About' },
    { id: 3, path: 'Services' },
    { id: 4, path: 'Projects' },
    { id: 5, path: 'Contact' }
]

// Anza apa sasa.
const heroText: HeroText = {
    title: "Building The Future,",
    floatingText: "Today",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatem illum laudantium eum sit voluptate, corrupti molestiae ea ut dignissimos."
}

const aboutSectionData: AboutInfo = {
    title: "I Shape the Digital Frontier",
    descriptionA: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente corrupti magni delectus saepe vitae ut quibusdam, numquam aut id minima consequatur quod rerum praesentium sed repudiandae necessitatibus corporis facere quam.",
    descriptionB: "I specialize in creating solutions that not only solve today's challenges but anticipate tomorrow's opportunities. My approach combines rigorous research with agile development to deliver transformative technologies.",
    techStack: [
        { id: 1, icon: FaBrain, title: 'AI & Machine Learning' },
        { id: 2, icon: FaAtom, title: 'Quantum Computing' },
        { id: 3, icon: FaRobot, title: 'Advanced Robotics' },
        { id: 4, icon: FaShieldAlt, title: 'Cyber Security' }
    ],
    profileImage: '/sunset.jpg',
    phone: '+25400123456',
    email: 'wangarikimani.gmail.com',
    socials: {
        github: 'https://github.com/GathaiKE/',
        linkedIn: 'linked in link goes here',
    }
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        initials: 'MK',
        name: 'Michael K.',
        position: 'CTO, Future Dynamics',
        content: '"Wangari Kimani\'s quantum computing solution reduced our processing time from weeks to hours. Their expertise is unparalleled."',
        stars: 5
    },
    {
        id: 2,
        initials: 'SP',
        name: 'Sarah P.',
        position: 'CEO, NeuroTech Inc',
        content: '"The AI platform developed by Wangari Kimani has transformed our research capabilities beyond expectations."',
        stars: 4.5
    },
    {
        id: 3,
        initials: 'DJ',
        name: 'David J.',
        position: 'Director, Global Systems',
        content: '"Her cybersecurity framework is the most advanced I\'ve seen, and implementation was seamless."',
        stars: 5
    }
]

const skills: SkillSet[] = [
    {
        id: 1,
        icon: FaMicrochip, title: 'Advanced Computing',
        description: 'Quantum and neuromorphic computing solutions that push processing boundaries.'
    },
    {
        id: 2,
        icon: FaRobot, title: 'AI & Automation',
        description: 'Intelligent systems that learn, adapt, and automate processes.'
    },
    {
        id: 3,
        icon: FaVrCardboard, title: 'Immersive Reality',
        description: 'AR, VR, and mixed reality experiences that transform digital interactions.'
    },
    {
        id: 4,
        icon: FaShieldAlt, title: 'Cyber Security',
        description: 'Next-gen security protocols using AI and blockchain.'
    },
    {
        id: 5,
        icon: FaNetworkWired, title: 'IoT Solutions',
        description: 'Integrated smart systems for seamless digital ecosystems.'
    },
    {
        id: 6,
        icon: FaDna, title: 'Bio-Tech Integration',
        description: 'Technology bridging digital and biological systems.'
    }
]

const projects: Project[] = [
    {
        id: 1,
        title: 'Quantum Neural Network',
        desc: 'Hybrid system combining quantum processing with neural networks for advanced pattern recognition.',
        tags: ['Quantum Computing', 'AI', 'Research'],
        gradient: 'from-primary to-secondary',
        github: '',
        liveDemo: '',
        coverImage: null,
        images: []
    },
    {
        id: 2,
        title: 'Omni-Secure Platform',
        desc: 'Blockchain-based security ecosystem adapting to emerging threats in real-time.',
        tags: ['Cyber Security', 'Blockchain', 'AI'],
        gradient: 'from-secondary to-primary',
        github: '',
        liveDemo: '',
        coverImage: null,
        images: []
    },
    {
        id: 3,
        title: 'Neuro-Link Interface',
        desc: 'Non-invasive BCI system for direct brain-digital communication.',
        tags: ['Neuroscience', 'Hardware', 'Innovation'],
        gradient: 'from-accent to-primary',
        github: '',
        liveDemo: '',
        coverImage: null,
        images: []
    },
    {
        id: 4,
        title: 'Quantum Neural Network',
        desc: 'Hybrid system combining quantum processing with neural networks for advanced pattern recognition.',
        tags: ['Quantum Computing', 'AI', 'Research'],
        gradient: 'from-primary to-secondary',
        github: '',
        liveDemo: '',
        coverImage: null,
        images: []
    },
    {
        id: 5,
        title: 'Omni-Secure Platform',
        desc: 'Blockchain-based security ecosystem adapting to emerging threats in real-time.',
        tags: ['Cyber Security', 'Blockchain', 'AI'],
        gradient: 'from-secondary to-primary',
        github: '',
        liveDemo: '',
        coverImage: null,
        images: []
    },
    {
        id: 6,
        title: 'Neuro-Link Interface',
        desc: 'Non-invasive BCI system for direct brain-digital communication.',
        tags: ['Neuroscience', 'Hardware', 'Innovation'],
        gradient: 'from-accent to-primary',
        github: '',
        liveDemo: '',
        coverImage: null,
        images: []
    }
];

const awards: Award[] = [
    { id: 1, title: 'Quantum Dynamics' },
    { id: 2, title: 'NeuroTech Labs' },
    { id: 3, title: 'Future Systems Inc' },
    { id: 4, title: 'Astra Robotics' },
    { id: 5, title: 'CyberCore Solutions' },
    { id: 6, title: 'NanoTech Industries' }
]

export const fetchRoutes = (): Route[] => routes
export const fetchHeroData = (): HeroText => heroText
export const fetchAboutSectionData = (): AboutInfo => aboutSectionData
export const fetchTestimonials = (): Testimonial[] => testimonials
export const fetchSkills = (): SkillSet[] => skills
export const fetchProjects = (): Project[] => projects
export const fetchAwards = (): Award[] => awards