import Header from '../../components/Header'
import Calculator from '../../components/Calculator'

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Header />
      <Calculator />
    </main>
  )
}