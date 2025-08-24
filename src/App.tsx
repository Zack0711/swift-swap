import SyntaxConverter from './components/SyntaxConverter'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            SwiftSwap - HTML Syntax Converter
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Convert HTML syntax for travel websites in real-time
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SyntaxConverter />
      </main>
    </div>
  )
}

export default App