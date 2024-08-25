import Container from "@/components/Container";
import AvatarPicking from "@/components/partials/AvatarPicking";

// const getPosts = async (): Promise<PostType[]> => {
//     return await prisma.post.findMany({});
// };

export default async function Page() {
  // const posts = await getPosts();

  // const t = await getTranslations("Posts");

  return (
    <Container className="lg:px-64 mt-12">
      <section className="bg-gray-100">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <form action="#" className="space-y-4">
            <div className="flex gap-2">
              <div>
                <AvatarPicking />
              </div>

              <div className="flex flex-col w-full gap-2">
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    id="name"
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>

                  <textarea
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                    placeholder="Message"
                    rows="4"
                    id="message"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </Container>
  );
}
