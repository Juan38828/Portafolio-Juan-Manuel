import Card from "../Card";

/**
 * SkillCard
 * Una tarjeta por categoría con su lista de tecnologías. El ícono y el
 * nombre reaccionan juntos al hover para dar sensación de tarjeta "viva".
 */
const SkillCard = ({ title, skills }) => {
  return (
    <Card className="flex flex-col gap-5">
      <h3 className="font-display text-lg font-semibold text-text">{title}</h3>

      <ul className="flex flex-col gap-2.5">
        {skills.map(({ name, icon: Icon }) => (
          <li
            key={name}
            className="group flex items-center gap-2.5 rounded-lg border border-transparent px-2.5 py-2 transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <Icon
              className="text-lg text-text-muted transition-colors group-hover:text-primary-soft"
              aria-hidden="true"
            />
            <span className="text-sm text-text-muted transition-colors group-hover:text-text">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default SkillCard;
