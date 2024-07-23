## Canvas CustomJS Search
Proof of concept Additional Javascript that uses the Canvas REST API to add a search on the global navigation for the current course.

It will attempt to cache the API results for faster speed using CacheStorage with the results encrypted on disk and in Chrome to protect student data as the plugin doesn't intercept logouts to remove the search history/cache after a student/faculty/staff has logged out.
