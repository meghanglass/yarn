export default function CollectionPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <h1>Kolekcja: {params.slug}</h1>
    </main>
  );
}
