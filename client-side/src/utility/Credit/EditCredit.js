import axios from "axios";
const editCredit = async (id) => {
	const apiCaller = axios.create({ baseURL: "http://localhost:1000/" });
	const { data } = await apiCaller.put(`/update/${id}`);
	return data;
};
export default editCredit;
