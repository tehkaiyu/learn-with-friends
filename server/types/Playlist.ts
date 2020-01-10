const { objectType } = require('nexus')

export const Playlist = objectType({
  name: 'Playlist',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.published()
    t.model.title()
    t.model.description()
    t.model.author()
  },
})
