# Simple Sharepoint Markdown Edit
Make `.env.local` and define your subdomain.
```
REACT_APP_SHAREPOINT_SUBDOMAIN={your subdomain}
REACT_APP_SHAREPOINT_SITENAME={your site name}
REACT_APP_SHAREPOINT_LISTNAME={your list name}
// https://{site_url}/_api/web/lists/GetByTitle('{List Name}')?$select=ListItemEntityTypeFullName
REACT_APP_SHAREPOINT_LISTFULLNAME={your ListItemEntityTypeFullName}
```
Adjust `src/utils/util.js`. After buiding rename `index.html` to `index.aspx`.

## Reference for Sharepoint List API
-	https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/working-with-lists-and-list-items-with-rest#create-list-item
- https://www.codesharepoint.com/rest-api/get-form-digest-value--in-sharepoint-using-rest-api
- https://code2care.org/sharepoint/how-to-create-sharepoint-online-list-item-using-rest-api
