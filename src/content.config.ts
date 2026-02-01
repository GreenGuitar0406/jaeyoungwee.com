import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 공통 스키마
const contentSchema = ({ image }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	});

const diary = defineCollection({
	loader: glob({ base: './src/content/diary', pattern: '**/*.{md,mdx}' }),
	schema: contentSchema,
});

const books = defineCollection({
	loader: glob({ base: './src/content/books', pattern: '**/*.{md,mdx}' }),
	schema: contentSchema,
});

const music = defineCollection({
	loader: glob({ base: './src/content/music', pattern: '**/*.{md,mdx}' }),
	schema: contentSchema,
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
