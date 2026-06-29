import { describe, it, expect } from 'vitest'
import { GetFeaturedProjects } from '@/application/use-cases/GetFeaturedProjects'
import { InMemoryProfileRepository } from '../_fixtures/InMemoryProfileRepository'
import type { Project } from '@/domain/entities/Project'

function project(id: string, featured: boolean, order: number): Project {
  return {
    id,
    name: id,
    tagline: '',
    description: '',
    context: '',
    stack: [],
    tags: [],
    links: [],
    featured,
    order,
  }
}

describe('GetFeaturedProjects', () => {
  it('returns only featured projects, ordered by `order`', () => {
    const repo = new InMemoryProfileRepository({
      projects: [
        project('c', true, 3),
        project('hidden', false, 1),
        project('a', true, 1),
        project('b', true, 2),
      ],
    })

    const result = new GetFeaturedProjects(repo).execute()

    expect(result.map((p) => p.id)).toEqual(['a', 'b', 'c'])
  })

  it('returns an empty list when nothing is featured', () => {
    const repo = new InMemoryProfileRepository({
      projects: [project('x', false, 1)],
    })
    expect(new GetFeaturedProjects(repo).execute()).toEqual([])
  })
})
