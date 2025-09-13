
export default function Form({mode, handleSubmit, handleCancel, heading, setHeading, description, setDescription}){
    return(
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full my-6">
          <h2 className="text-xl font-bold mb-4">{mode === 'create' ? 'Create Note' : 'Update Note'}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none resize-none"
              rows={4}
              required
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-600 py-2 px-4 rounded font-bold"
              >
                {mode === 'create' ? 'Create' : 'Update'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-500 py-2 px-4 rounded font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
    )
}