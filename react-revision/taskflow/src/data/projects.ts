export interface Project {
  id: string
  name: string
}

const projects: Project[] = [
  {
    id: 'website-redesign',
    name: 'Website Redesign',
  },
  {
    id: 'mobile-app',
    name: 'Mobile App',
  },
  {
    id: 'marketing',
    name: 'Marketing',
  },
]

export function getProjectId(projectName: string): string {
  const project = projects.find((item) => item.name === projectName)

  return (
    project?.id ??
    projectName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  )
}

export default projects
