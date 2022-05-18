const firebaseAPI = {
  /**
     * @name getAll
     * @description fetch whole collection from firebase
     * @params db default should be app.$fire.firestore or this.$fire.firestore but its depends on context -> ssr or csr?
     */
  async getAll (db, collectionName) {
    let fetchedData = null
    const restaurantRef = db.collection(collectionName)
    try {
      const snapshot = await restaurantRef.get()
      fetchedData = snapshot.docs.map((doc) => {
        return doc.data()
      })
      return fetchedData
    } catch (e) {
      throw new Error(e)
    }
  },
  get () {
    // TODO
  },
  async create (db, collectionName, payload) {
    if (!payload) { throw new Error('payload is required!') }
    try {
      const req = await db.collection(collectionName).add(payload)
      return req
    } catch (e) {
      throw new Error(e)
    }
  },
  edit () {
  },
  async search (db, collectionName, queryKey, query) {
    const ref = db.collection(collectionName)
    try {
      const snapshot = await ref.where(queryKey, '>=', query).get()
      if (snapshot.docs) {
        return snapshot.docs.map((doc) => {
          return doc.data()
        })
      } else {
        return []
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}
export default firebaseAPI
