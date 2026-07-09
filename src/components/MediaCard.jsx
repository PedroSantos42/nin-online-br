// src/components/MediaCard.jsx

export function MediaCard({ title, description, tags = [], videoUrl }) {
  return (
    <div className="bg-folha-card border border-folha-border rounded-xl p-5 hover:border-folha-blue transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,191,255,0.1)]">
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-xs font-bold px-3 py-1 rounded-full bg-folha-blue/20 text-folha-blue border border-folha-blue/30"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Título */}
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

      {/* Descrição */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4">{description}</p>

      {/* Vídeo / GIF */}
      {videoUrl && (
        <div className="relative rounded-lg overflow-hidden bg-black border border-folha-border">
          <video 
            src={videoUrl} 
            autoPlay 
            muted 
            loop 
            playsInline 
            controls
            className="w-full max-h-[220px] object-cover"
          >
            Seu navegador não suporta vídeos.
          </video>
        </div>
      )}
    </div>
  );
}