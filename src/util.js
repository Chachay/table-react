import axios from "axios"

export const sharepoint = {
	EndPoint: `https://${process.env.REACT_APP_SHAREPOINT_SUBDOMAIN}.sharepoint.com/sites`,
	siteName: process.env.REACT_APP_SHAREPOINT_SITENAME,
	listName: process.env.REACT_APP_SHAREPOINT_LISTNAME,
	ListItemEntityTypeFullName: process.env.REACT_APP_SHAREPOINT_LISTFULLNAME,

	getListURI: function(){
		return `${this.EndPoint}/${this.siteName}/_api/web/lists/getByTitle('${this.listName}')/items`;
	},

	getContextInfoURI: function(){
		return`${this.EndPoint}/${this.siteName}/_api/contextinfo`;
	},

	getItemURI: function(entryId){
		return `${this.getListURI()}(${entryId})`;
	},

	getList: async function(){
		return axios.get(this.getListURI());
	},

	getItem: async function(entryId){
    return axios.get(this.getItemURI(entryId));
	},

	putItem: async function(entryId, data){
		return axios.post(this.getContextInfoURI(), {})
			.then(response => {
				return axios.post(
					this.getItemURI(entryId),
					this.formatPostdata(data),
					{
						headers: {
							"Content-Type": "application/json;odata=verbose",
							"X-RequestDigest": response.data.FormDigestValue,
							"If-Match": "*",
							"X-HTTP-Method": "MERGE"
						}
					}
				);
			});
	},

	postItem: async function(data){
		return axios.post(`${this.ContextInfo}`, {})
			.then(response => {
				return axios.post(
					this.getListURI(),
					this.formatPostdata(data),
					{
						headers: {
							"Content-Type": "application/json;odata=verbose",
							"X-RequestDigest": response.data.FormDigestValue
						}
					}
				);
			});
	},


	formatPostdata: function(data){
    return {
      __metadata: {type: this.ListItemEntityTypeFullName},
      Title: data.title,
      body: data.body
    };
	},

	translateItemDetail: function(data){
		return {
			id: data.Id,
			title: (data.Title === "" || !data.Title)? "(non-title)" : data.Title,
			body: data.body,
			date: data.date
		};
	},

	translateList: function(data){
		return data.value.map(e => this.translateItemDetail(e));
	}
};