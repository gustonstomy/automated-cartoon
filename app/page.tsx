import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 leading-tight">
              Automated Cartoon Maker
            </h1>
            <p className="text-gray-700 text-lg max-w-xl leading-relaxed">
              Turn your text stories into animated cartoons instantly. Our AI
              automatically generates scenes, characters, and voiceovers so you
              can focus on storytelling.
            </p>
            <div className="flex gap-4">
              <a
                href="/create"
                className="bg-gray-800 hover:bg-gray-900 text-white px-10 py-4 rounded-full text-lg font-medium transition-colors inline-block"
              >
                Start Creating
              </a>
              <a
                href="/projects"
                className="bg-white hover:bg-gray-50 text-gray-800 px-10 py-4 rounded-full text-lg font-medium transition-colors inline-block shadow-sm"
              >
                View Gallery
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-64 lg:h-96 bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              alt="Cartoon Preview"
              src="/Imageright.png"
              width={1000}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          {/* Decorative Image */}
          <div className="relative h-80 w-96 bg-gradient-to-br from-gray-300 to-gray-200 rounded-lg shadow-inner overflow-hidden">
            <Image
              alt="Characters"
              src="/Imageleft.png"
              width={1000}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Stats Card */}
          <div className="bg-gray-300/60 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-lg">
            <div className="grid grid-cols-3 gap-6 lg:gap-8">
              {/* Stat 1 */}
              <div className="space-y-3">
                <div className="text-3xl lg:text-4xl font-bold text-gray-800">
                  100+
                </div>
                <div className="h-1 w-12 bg-gray-800 rounded-full"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Unique characters available for your stories, from animals to
                  people.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-3">
                <div className="text-3xl lg:text-4xl font-bold text-gray-800">
                  Instant
                </div>
                <div className="h-1 w-12 bg-gray-800 rounded-full"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Generation of animations. No waiting for hours to see your
                  creation.
                </p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-3">
                <div className="text-3xl lg:text-4xl font-bold text-gray-800">
                  Free
                </div>
                <div className="h-1 w-12 bg-gray-800 rounded-full"></div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  To use and share. Export your videos and share them with
                  friends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
