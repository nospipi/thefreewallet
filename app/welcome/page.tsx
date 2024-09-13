import GoogleButton from "./GoogleButton.client"

const Welcome = () => {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-md bg-theme-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-theme-dark">
            Welcome to TheFreeWallet !
          </h1>
          <p className="text-theme-blue mt-2">
            A simple and free budgeting tool.
          </p>
        </div>

        <div className="space-y-3">
          <GoogleButton />
        </div>
      </div>
    </div>
  )
}

export default Welcome
