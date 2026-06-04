export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <h1>Produkt: {params.slug}</h1>
    </main>
  );
}
