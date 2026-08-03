import { Navigate } from 'react-router-dom'

/** Golf residential plots are part of BTR Township (Gardenia / villa plots) */
export default function GolfPlots() {
  return <Navigate to="/btr-township" replace />
}
