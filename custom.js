

/// **********************
//  Local search for Canvas


window.onload += function() {
    //Icon and other consts
    if(window.localCanvasJSSearch === undefined) {
        window.localCanvasJSSearch = {}
    }
    const _canvasjs_local_search_id = '_canvasjs_local_search_gnav';
    const _canvasjs_local_search_icon = '<!-- magnifying-glass icon by Free Icons (https://free-icons.github.io/free-icons/) --><svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">  <path d="M 418.45186640471513 209.22593320235757 Q 417.4459724950884 279.6385068762279 378.21611001964635 332.95088408644403 L 489.87033398821217 443.5992141453831 L 489.87033398821217 443.5992141453831 L 512 466.7347740667976 L 512 466.7347740667976 L 466.7347740667976 512 L 466.7347740667976 512 L 443.5992141453831 489.87033398821217 L 443.5992141453831 489.87033398821217 L 332.95088408644403 378.21611001964635 L 332.95088408644403 378.21611001964635 Q 279.6385068762279 417.4459724950884 209.22593320235757 418.45186640471513 Q 120.70726915520629 416.44007858546166 61.35952848722986 357.0923379174853 Q 2.011787819253438 297.74459724950884 0 209.22593320235757 Q 2.011787819253438 120.70726915520629 61.35952848722986 61.35952848722986 Q 120.70726915520629 2.011787819253438 209.22593320235757 0 Q 297.74459724950884 2.011787819253438 357.0923379174853 61.35952848722986 Q 416.44007858546166 120.70726915520629 418.45186640471513 209.22593320235757 L 418.45186640471513 209.22593320235757 Z M 209.22593320235757 354.0746561886051 Q 248.4557956777996 354.0746561886051 281.65029469548136 334.96267190569745 L 281.65029469548136 334.96267190569745 L 281.65029469548136 334.96267190569745 Q 314.8447937131631 315.8506876227898 334.96267190569745 281.65029469548136 Q 354.0746561886051 247.44990176817288 354.0746561886051 209.22593320235757 Q 354.0746561886051 171.00196463654223 334.96267190569745 136.8015717092338 Q 314.8447937131631 102.60117878192534 281.65029469548136 83.48919449901769 Q 248.4557956777996 64.37721021611002 209.22593320235757 64.37721021611002 Q 169.99607072691552 64.37721021611002 136.8015717092338 83.48919449901769 Q 103.60707269155206 102.60117878192534 83.48919449901769 136.8015717092338 Q 64.37721021611002 171.00196463654223 64.37721021611002 209.22593320235757 Q 64.37721021611002 247.44990176817288 83.48919449901769 281.65029469548136 Q 103.60707269155206 315.8506876227898 136.8015717092338 334.96267190569745 Q 169.99607072691552 354.0746561886051 209.22593320235757 354.0746561886051 L 209.22593320235757 354.0746561886051 Z" /></svg>'
    const _canvasjs_local_search_name = "Search"
    const _canvasjs_local_search_cache_prefix = "canvasjs_local_search_"
    if(document.querySelector("#"+_canvasjs_local_search_id) === null) {
        window.localCanvasJSSearch.showSearch = function () {
            document.querySelector('#_canvasjs_local_search_dialog').showModal()

        }

        window.localCanvasJSSearch.search = async function () {
            var searchText = document.querySelector('#_customjs_local_search_box').value
                if(ENV !== undefined && 'COURSE_ID' in ENV && ENV.COURSE_ID > 0) {

                if(searchText.length > 3) {
                    let resultHTML = ""

                    //Search all pages in the course
                    matchingPages = await window.localCanvasJSSearch.searchCoursePages(ENV.COURSE_ID,searchText)
                    for(pageI in matchingPages) {
                        pageR = matchingPages[pageI]
                        resultHTML = resultHTML+ `<li><h4><a href="/courses/${ENV.COURSE_ID}/wiki/${pageR.page_id}" >Page - ${pageR.title}</a></h4><pre>${pageR.body_sub_content}</pre></li>`
                    }

                    //Search announcements
                    matchingAnnouncements = await window.localCanvasJSSearch.searchAnnouncements(ENV.COURSE_ID,searchText)
                    for(aI in matchingAnnouncements) {
                        announceR = matchingAnnouncements[aI]
                        resultHTML = resultHTML+ `<li><h4><a href="/courses/${ENV.COURSE_ID}/announcements/${announceR.id}" >Annoucement - ${announceR.title}</a></h4><pre>${announceR.body_sub_content}</pre></li>`
                    }

                    //Search all assignments in the course
                    matchingAssignments = await window.localCanvasJSSearch.searchAssignments(ENV.COURSE_ID,searchText)
                    for(aI in matchingAssignments) {
                        assignR = matchingAssignments[aI]
                        resultHTML = resultHTML+ `<li><h4><a href="/courses/${ENV.COURSE_ID}/assignments/${assignR.assignment_id}" >Assignment - ${assignR.name}</a></h4><pre>${assignR.body_sub_content}</pre></li>`
                    }
                    //Search all discussions in the course
                    matchingDiscussions = await window.localCanvasJSSearch.searchDiscussions(ENV.COURSE_ID,searchText)
                    for(dI in matchingDiscussions) {
                        discussR = matchingDiscussions[dI]
                        resultHTML = resultHTML+ `<li><h4><a href="/courses/${ENV.COURSE_ID}/discussion_topics/${discussR.discussion_topic_id}" >Discussion - ${discussR.title}</a></h4><pre>${discussR.body_sub_content}</pre></li>`
                    }




                    if(resultHTML.length == 0) {
                        resultHTML = "<strong>No results found</strong>"
                    }else{
                        resultHTML = `<ul>${resultHTML}</ul>`
                    }
                    document.querySelector('#_canvasjs_local_search_results').innerHTML=resultHTML

                }else{
                    document.querySelector('#_canvasjs_local_search_results').innerHTML='<strong>Please enter in at least 3 letters to search</strong>'
                }
            }else{
                document.querySelector('#_canvasjs_local_search_results').innerHTML='<strong>Please enter a course before using search</strong>'
            }
        }

        window.localCanvasJSSearch.searchCoursePages= async function(course_id,search_term,match_limit=5) {
            matches = []
            cPages = await window.localCanvasJSSearch.CanvasAPICall(`/api/v1/courses/${course_id}/pages`)
            
            for (cPageI in cPages) {
                if(matches.length < match_limit) {
                    cPage = await window.localCanvasJSSearch.CanvasAPICall(`/api/v1/courses/${course_id}/pages/${cPages[cPageI].page_id}`)
                    if('title' in cPage && 'body' in cPage) {
                        //console.log(cPage.title)
                        let stIndex = cPage.title.indexOf(search_term)
                        cPageBody = (await window.localCanvasJSSearch.stripHTML(cPage.body))
                        subBody = cPageBody.substring(0,Math.min(160,cPageBody.length))
                        let sbIndex = cPageBody.indexOf(search_term)
                        if(sbIndex >= 0) {
                            subBody = cPageBody.substring(Math.max(0,(sbIndex-80)),Math.min(sbIndex+80,cPageBody.length))
                        }
                            if(stIndex > -1 || sbIndex > -1) {
                                matches.push( {
                                    "type": "page",
                                    "course": course_id,
                                    "page_id": cPage.page_id,
                                    "title": cPage.title,
                                    "title_matches": (stIndex),
                                    "body_sub_content": subBody,
                                    "body_matches": (sbIndex)
                                } );
                            }
                    }
                }
            }
            return matches;
        }

        window.localCanvasJSSearch.searchAssignments = async function(course_id,search_term,match_limit=5) {
            matches = []
            cAssigns = await window.localCanvasJSSearch.CanvasAPICall(`/api/v1/courses/${course_id}/assignments`)
            
            for (cI in cAssigns) {
                if(matches.length < match_limit) {
                    cAssign = cAssigns[cI]
                    if('name' in cAssign && 'description' in cAssign) {
                        //console.log(cPage.title)
                        let stIndex = cAssign.name.indexOf(search_term)
                        cAssignBody = (await window.localCanvasJSSearch.stripHTML(cAssign.description))
                        subBody = cAssignBody.substring(0,Math.min(160,cAssignBody.length))
                        let sbIndex = cAssignBody.indexOf(search_term)
                        if(sbIndex >= 0) {
                            subBody = cAssignBody.substring(Math.max(0,(sbIndex-80)),Math.min(sbIndex+80,cAssignBody.length))
                        }
                            if(stIndex > -1 || sbIndex > -1) {
                                matches.push( {
                                    "type": "assignment",
                                    "course": course_id,
                                    "assignment_id": cAssign.id,
                                    "name": cAssign.name,
                                    "title_matches": (stIndex),
                                    "body_sub_content": subBody,
                                    "body_matches": (sbIndex)
                                } );
                            }
                    }
                }
            }
            return matches;
        }

        window.localCanvasJSSearch.searchAnnouncements = async function(course_id,search_term,match_limit=5) {
            //
            matches = []
            cAnnouncements = await window.localCanvasJSSearch.CanvasAPICall(`/api/v1/announcements?context_codes[]=course_${course_id}`)
            
            for (cI in cAnnouncements) {
                if(matches.length < match_limit) {
                    cAnnounce = cAnnouncements[cI]
                    if('title' in cAnnounce && 'message' in cAnnounce) {
                        //console.log(cPage.title)
                        let stIndex = cAnnounce.title.indexOf(search_term)
                        cAnnounceBody = (await window.localCanvasJSSearch.stripHTML(cAnnounce.message))
                        subBody = cAnnounceBody.substring(0,Math.min(160,cAnnounceBody.length))
                        let sbIndex = cAnnounceBody.indexOf(search_term)
                        if(sbIndex >= 0) {
                            subBody = cAnnounceBody.substring(Math.max(0,(sbIndex-80)),Math.min(sbIndex+80,cAnnounceBody.length))
                        }
                            if(stIndex > -1 || sbIndex > -1) {
                                matches.push( {
                                    "type": "announcement",
                                    "course": course_id,
                                    "id": cAnnounce.id,
                                    "title": cAnnounce.title,
                                    "title_matches": (stIndex),
                                    "body_sub_content": subBody,
                                    "body_matches": (sbIndex)
                                } );
                            }
                    }
                }
            }
            return matches;
        }


        window.localCanvasJSSearch.searchDiscussions = async function(course_id,search_term,match_limit=5) {
            matches = []
            cDiscussions = await window.localCanvasJSSearch.CanvasAPICall(`/api/v1/courses/${course_id}/discussion_topics`)
            console.debug(cDiscussions)
            for (cI in cDiscussions) {
                
                if(matches.length < match_limit) {

                    cDiscussionTopic = cDiscussions[cI]
                    if('title' in cDiscussionTopic && 'message' in cDiscussionTopic) {
                        
                        let stIndex = cDiscussionTopic.title.indexOf(search_term)
                        cDiscussionTopicBody = (await window.localCanvasJSSearch.stripHTML(cDiscussionTopic.message))
                        subBody = cDiscussionTopicBody.substring(0,Math.min(160,cDiscussionTopicBody.length))
                        let sbIndex = cDiscussionTopicBody.indexOf(search_term)
                        if(sbIndex >= 0) {
                            subBody = cDiscussionTopicBody.substring(Math.max(0,(sbIndex-80)),Math.min(sbIndex+80,cDiscussionTopicBody.length))
                        }
                            if(stIndex > -1 || sbIndex > -1) {
                                matches.push( {
                                    "type": "discussion_topics",
                                    "course": course_id,
                                    "discussion_topic_id": cDiscussionTopic.id,
                                    "title": cDiscussionTopic.title,
                                    "title_matches": (stIndex),
                                    "body_sub_content": subBody,
                                    "body_matches": (sbIndex)
                                } );
                            }else{
                                
                                // Only search discussion entries if the topic doesn't match since we'd just link to the topic
                                cDiscussionEntries = await window.localCanvasJSSearch.CanvasAPICall(`/api/v1/courses/${course_id}/discussion_topics/${cDiscussionTopic.id}/entries`)
                                console.debug(`/api/v1/courses/${course_id}/discussion_topics/${cDiscussionTopic.id}/entries`)
                                for (ceI in cDiscussionEntries) {
                                    cDiscussionEntry = cDiscussionEntries[ceI]
                                    
                                    if('message' in cDiscussionEntry) {
                                        cDiscussionEntryBody = (await window.localCanvasJSSearch.stripHTML(cDiscussionEntry.message))
                                        subBody = cDiscussionEntryBody.substring(0,Math.min(160,cDiscussionEntryBody.length))
                                        let sbeIndex = cDiscussionEntryBody.indexOf(search_term)
                                        if(sbeIndex >= 0) {
                                            subBody = cDiscussionEntryBody.substring(Math.max(0,(sbeIndex-80)),Math.min(sbeIndex+80,cDiscussionEntryBody.length))
                                            
                                            matches.push( {
                                                "type": "discussion_topics",
                                                "course": course_id,
                                                "discussion_topic_id": cDiscussionTopic.id,
                                                "title": `${cDiscussionEntry.user.display_name} @  ${cDiscussionTopic.title}`,
                                                "title_matches": (stIndex),
                                                "body_sub_content": subBody,
                                                "body_matches": (sbIndex)
                                            } );
                                        }
                                    }
                                }
                        }
                    }
                }
                
            }
            return matches;
        }

        window.localCanvasJSSearch.stripHTML = async function (html) {
            let tDiv = document.createElement("div")
            tDiv.innerHTML = html
            return tDiv.innerText || tDiv.textContent || "";
        }

        window.localCanvasJSSearch.Encode = async function(message) {
           return await crypto.subtle.encrypt({ name: "AES-GCM", iv: await  window.localCanvasJSSearch.GetIV() },await window.localCanvasJSSearch.GetKey(),window.localCanvasJSSearch.te.encode(message))
        }

        window.localCanvasJSSearch.Decode = async function(buffer) {
            return window.localCanvasJSSearch.de.decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: await window.localCanvasJSSearch.GetIV() },await window.localCanvasJSSearch.GetKey(),buffer))
        }

        window.localCanvasJSSearch.GetKey = async function() {
            //Not a great KDF, but this is meant to protect against basic inspection
            let keyCode = (await crypto.subtle.digest('SHA-256',window.localCanvasJSSearch.te.encode(ENV.user_cache_key.substr(0,48))))
            return (await crypto.subtle.importKey('raw',keyCode,{"name":"AES-GCM"},true,['encrypt','decrypt']))
        }

        window.localCanvasJSSearch.GetIV = async function() {
            return new Buffer(window.localCanvasJSSearch.te.encode(ENV.user_cache_key.substr(0,16)))
        }

         window.localCanvasJSSearch.CanvasAPICall = async function (url) {
            json = false;
            if ('caches' in window  ) {
                //We have a cache
                const cacheStorage = await caches.open(`${_canvasjs_local_search_cache_prefix}-${ENV.user_cache_key.substr(0,32)}`);
                const cacheURL = await cacheStorage.match(url);
                if (cacheURL && cacheURL.ok) {
                    if(!cacheURL.headers.has('js-cache-time') || cacheURL.headers.get('js-cache-time')+6000 < Date.now()) {
                        //If we don't have an expiry or we expired - delete it
                        cacheStorage.delete(url)
                        console.log(`Deleting bad/expired entry ${url} from cache`)
                    }else{
                        //console.debug(`Got ${url} from cache`)
                        json = JSON.parse(await window.localCanvasJSSearch.Decode(await cacheURL.arrayBuffer()))
                        //console.debug(json)
                    }
                    
                }
            }

            //We need to call the API
            if(json === false) {
                resp = await fetch(url)
                //Check if we are waiting
                if(resp.status == 403)
                    console.log("Failed call - likely need to back off Canvas calls for a few seconds")
                
                if(!resp.ok) {
                    console.log("Failed call")
                }
                console.log("Got new resp")
                json = await resp.json()
                if ('caches' in window  ) {
                    //console.debug("Adding to Cache")
                    const cacheStorage = await caches.open(`${_canvasjs_local_search_cache_prefix}-${ENV.user_cache_key.substr(0,32)}`);
                    enc_data = await window.localCanvasJSSearch.Encode(JSON.stringify(json))
                    nResponse = new Response(enc_data,{
                        headers: {
                          "js-cache-time": Date.now()
                        }
                      })
                    
                    await cacheStorage.put(url,nResponse);
                    //console.debug("Added")
                    
                }
                
            }

            return json;
        }
    


        // Make a new button for searching
        document.querySelector('#menu > li.ic-app-header__menu-list-link')
        newNode = document.querySelector('#menu >li .ic-app-header__menu-list-link').cloneNode(3)
        newNode.querySelector('div.menu-item-icon-container').innerHTML = _canvasjs_local_search_icon
        newNode.querySelector('div.menu-item__text').innerHTML = _canvasjs_local_search_name
        newNode.href = "#"
        newNode.id = _canvasjs_local_search_id
        newNode.onclick = function () { window.localCanvasJSSearch.showSearch() }
        //Add the button to the global nav menu
        document.querySelector('#menu').appendChild(newNode)

        // Create the search UI
        _popup_window_node = document.createElement("div")
        //_popup_window_node.style = "position: fixed; z-index:99; top:0.2vh;"
        _popup_window_node_dialog = document.createElement("dialog")
        _popup_window_node_dialog.innerHTML = "<button onClick='document.querySelector(\"#_canvasjs_local_search_dialog\").close()' style='position: absolute; top: 0;right: 0;'>X</button><br/><div style='display: flex; width: 25%'><label for='_customjs_local_search_box' style='padding:1em;'>Search</label><input id='_customjs_local_search_box' onchange='window.localCanvasJSSearch.search()'></input></div><div id='_canvasjs_local_search_results'></div>"
        _popup_window_node_dialog.id = '_canvasjs_local_search_dialog'
        _popup_window_node.appendChild(_popup_window_node_dialog)
        document.body.appendChild(_popup_window_node)

        if (!('caches' in window)) {
            console.log("CacheStorage isn't available")
        }else{

            // Setup a text encoder for us to use for encoding
            window.localCanvasJSSearch.te = new TextEncoder()
            window.localCanvasJSSearch.de=new TextDecoder()

           // Check for any caches from other users and delete them
           async () => {
                const keys = await caches.keys();
                for(const k in keys) {
                    if(k.startsWith(_canvasjs_local_search_cache_prefix) && k !== `${_canvasjs_local_search_cache_prefix}-${ENV.user_cache_key.substr(0,32)}`) {
                            caches.delete(k);
                            console.debug(`Cleaned up old cache ${k}`)
                    }
                }
            }


        }
        
    }
}







//
/// **************************
