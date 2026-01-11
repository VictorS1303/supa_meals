export const POST = async (req) =>
{
    const url = new URL(req.url)

    return redirect(url.origin, {
        status: 301,
    })
}