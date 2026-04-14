import Header from '../../components/Header'
import AppContent from '../../components/AppContent'

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Header />
      <AppContent />
    </main>
  )
}