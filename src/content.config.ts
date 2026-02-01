import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 일반 게시글용 공통 스키마 (diary, books, projects, thoughts용)
const contentSchema = ({ image }: { image: any }) =>
    z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: image().optional(),
    });

// 🎵 음악(탑스터) 전용 스키마
const musicSchema = ({ image }: { image: any }) =>
    z.object({
        title: z.string(),          // 앨범 제목
        artist: z.string(),         // 아티스트 이름
        pubDate: z.coerce.date(),   // 리뷰 작성일 또는 발매일
        cover: image(),             // 앨범 아트워크 (이미지 최적화 적용)
        rating: z.number().min(1).max(5).optional(), // 별점 (1~5점)
        description: z.string().optional(), // 짧은 요약
    });

const diary = defineCollection({
    loader: glob({ base: './src/content/diary', pattern: '**/*.{md,mdx}' }),
    schema: contentSchema,
});

const books = defineCollection({
    loader: glob({ base: './src/content/books', pattern: '**/*.{md,mdx}' }),
    schema: contentSchema,
});

// music만 musicSchema를 사용하도록 설정
const music = defineCollection({
    loader: glob({ base: './src/content/music', pattern: '**/*.{md,mdx}' }),
    schema: musicSchema,
});

const projects = defineCollection({
    loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
    schema: contentSchema,
});

const thoughts = defineCollection({
    loader: glob({ base: './src/content/thoughts', pattern: '**/*.{md,mdx}' }),
    schema: contentSchema,
});

export const collections = { diary, books, music, projects, thoughts };