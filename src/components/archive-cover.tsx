export function ArchiveCover({ title, description, image, alt }: { title: string; description: string; image: string; alt: string }) {
  return <header className="archive-cover">
    <img src={image} alt={alt} width={1400} height={1000} fetchPriority="high"/>
    <div className="container archive-cover-copy">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  </header>;
}