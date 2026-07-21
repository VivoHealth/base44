export default function Logo({ className = "w-9 h-9" }) {
  return (
    <img
      src="https://media.base44.com/images/public/6a5ef948e4efced0b6b55db2/18bd7a7de_image.png"
      alt="MyHealthPilot"
      className={`${className} rounded-xl object-contain flex-shrink-0`}
    />
  );
}