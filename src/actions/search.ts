'use server';

import db from '@/database';
import { cursos } from '@/database/migrations/schema';

type SearchResult = {
  key: number;
  value: string;
};

const searchCourses = async () => {
  const courses = await db
    .select({ key: cursos.co_curso, value: cursos.no_curso })
    .from(cursos)
    .orderBy(cursos.no_curso);
  return courses;
};

export default async function search(field: string): Promise<SearchResult[]> {
  switch (field) {
    case 'courses':
      return searchCourses();

    default:
      return [];
  }
}
