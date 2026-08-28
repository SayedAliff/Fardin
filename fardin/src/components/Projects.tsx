export default function Projects(){
  const list = [
    {id:'maryland-homes',title:'MaryLand Homes RIVERVIEW', desc:'Connected through modern digital experiences and web technology.', url:'https://maryland.city'},
    {id:'time-and-technology',title:'Time and Technology', desc:'Connected through technology, development, and digital solutions.', url:'https://timeandtechnology.cloud/'},
    {id:'qubit-cloud',title:'Qubit Cloud', desc:'Connected through cloud technology and digital infrastructure.', url:'https://qubitcloudit.com/'}
  ]
  const [activeId, setActiveId] = useState(list[0].id)

  return (
    <div className="container project-index">
      <h2 className="section-title">Connected Companies</h2>
      <div className="project-stage">
        <div className={`project-art project-art-${activeId}`} aria-hidden="true">
          <span className="art-orbit art-orbit-one" />
          <span className="art-orbit art-orbit-two" />
          <span className="art-core" />
        </div>
        <div className="project-list" role="list" aria-label="Connected companies">
          {list.map((item, index) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className={`project-row${activeId === item.id ? ' active' : ''}`}
              onMouseEnter={() => setActiveId(item.id)}
              onFocus={() => setActiveId(item.id)}
              role="listitem"
            >
              <span className="project-number">0{index + 1}</span>
              <span className="project-name">{item.title}</span>
              <span className="project-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
