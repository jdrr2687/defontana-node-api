import express from "express";

import { getReport } from '../controllers/reports'

const router = express.Router()

router.get('/reports/:id', getReport)

export default router