export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            U
          </div>
          <div>
            <h2 className="text-xl font-semibold">User Name</h2>
            <p className="text-gray-600">member@nextapp.com</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">Account Information</h3>
            <p className="text-gray-600 mt-1">Member since January 2023</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Settings</h3>
            <p className="text-gray-600 mt-1">Customize your preferences</p>
          </div>
        </div>
      </div>
    </div>
  )
}