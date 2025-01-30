'use client';

export default function Error() {
  return (
    <main>
      <section className="bg-white">
        <div className="layout flex min-h-screen flex-col items-center justify-center text-center text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="mt-8 text-4xl md:text-6xl text-purple-600 font-semibold">
            Oops, something went wrong! Try again.
          </h1>
        </div>
      </section>
    </main>
  );
}
