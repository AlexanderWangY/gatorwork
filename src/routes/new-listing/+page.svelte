<div class="flex min-h-screen flex-row justify-center">
	<div class="w-full max-w-7xl p-6 md:px-0 md:py-10">
		<h1 class="text-brand-black text-3xl font-bold md:text-4xl">New listing</h1>

		<form>
			<div class="mt-8 flex flex-col gap-6">
				<div class="flex flex-col gap-4">
					<label for="images" class="text-brand-black text-lg font-medium"
						>Upload Images (max 5)</label
					>
					<input
						type="file"
						id="images"
						name="images"
						multiple
						accept="image/*"
						class="focus:border-brand-blue file:bg-brand-blue h-12 w-full rounded-md border border-gray-300 text-lg file:cursor-pointer file:rounded-md file:border-none file:px-4 file:py-2 file:text-white focus:outline-none"
					/>
					<!-- <p class="text-sm text-gray-500">{selectedFiles.length} file(s) selected</p> -->
				</div>

				<div class="flex flex-col gap-4">
					<label for="title" class="text-brand-black text-lg font-medium">Title</label>
					<input
						type="text"
						id="title"
						class="focus:border-brand-blue h-12 w-full rounded-md border border-gray-300 px-4 text-lg focus:outline-none"
						placeholder="Title of your listing"
					/>
				</div>

				<div class="flex flex-col gap-4">
					<label for="description" class="text-brand-black text-lg font-medium">Description</label>
					<textarea
						id="description"
						class="focus:border-brand-blue h-32 w-full rounded-md border border-gray-300 px-4 py-2 text-lg focus:outline-none"
						placeholder="Description of your listing"
					></textarea>
				</div>

				<div class="flex flex-col gap-4">
					<label for="price" class="text-brand-black text-lg font-medium">Price</label>
					<input
						type="number"
						id="price"
						class="focus:border-brand-blue h-12 w-full rounded-md border border-gray-300 px-4 text-lg focus:outline-none"
						placeholder="$0.00"
					/>
				</div>

				<div class="flex flex-col gap-4">
					<label for="image" class="text-brand-black text-lg font-medium">Image URL</label>
					<input
						type="url"
						id="image"
						class="focus:border-brand-blue h-12 w-full rounded-md border border-gray-300 px-4 text-lg focus:outline-none"
						placeholder="https://example.com/image.jpg"
					/>
				</div>

				<button
					type="submit"
					class="bg-brand-blue hover:bg-brand-blue-dark mt-6 h-12 w-full rounded-md text-white transition duration-200 ease-in-out"
				>
					Create Listing
				</button>
			</div>
		</form>
	</div>
</div>
