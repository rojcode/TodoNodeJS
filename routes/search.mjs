import { Router } from "express";
import __controller from '../controllers/search.mjs';

const __routerSearch = Router();




__routerSearch.get('/tags/:tag',__controller.searchTags);


export default __routerSearch;


