import { IconType } from "react-icons"

export interface Route {
 id: number
 path: string   
}

export interface HeroText{
    title: string
    floatingText: string
    description: string
}

export interface TechStack{
    id: number
    icon: IconType
    title: string
}

export interface AboutInfo {
    title: string
    descriptionA: string
    phone: string
    email: string
    descriptionB?: string
    profileImage: string | null
    techStack: TechStack[]
    socials: {
        github?: string
        linkedIn?: string
        kaggle?: string
        discord?: string
        twitter?: string
        colab?: string
    }
}

export interface SkillSet {
    id: number
    icon: IconType
    title: string
    description: string
}


export interface Testimonial {
    id: number
    initials:string
    name: string
    position: string
    content: string
    stars: number
}

export interface Project {
        id: number
        title: string
        desc: string
        tags: string[]
        gradient: string
        github: string
        liveDemo: string
        images: string[]
        features?: string[]
        coverImage: string | null
    }

export interface Award {
    id: number
    title: string
}

export interface EmailData {
    name: string
    subject: string
    email: string
    message: string
}