function MissionStatement({ highlight }: { highlight: string }) {
  return (
    <p className="mx-auto col-6 text-center font-italic font-weight-light" style={{ fontSize: 'small' }}>
      <span style={{ fontWeight: 'bold' }}>Brendan House is a house of spiritual renewal for makers &amp; artists</span>{' '}
      devoted to joyful, utter abandonment to Jesus Christ through prayerful use of the graces of making and the arts.
      Rooted first in worship, we seek to pass on what we’ve been given by becoming deployable creative resources for
      the kingdom of God in the areas of healing and discipleship. We grow into this capacity in ourselves and others
      through <span style={highlight === 'prayer' ? { fontWeight: 'bold' } : {}}>corporate prayer</span>,{' '}
      <span style={highlight === 'training' ? { fontWeight: 'bold' } : {}}>training</span>,{' '}
      <span style={highlight === 'community' ? { fontWeight: 'bold' } : {}}>affectionate community</span>, and{' '}
      <span style={highlight === 'creativity' ? { fontWeight: 'bold' } : {}}>thoughtful creative expression</span>.
    </p>
  );
}

export default MissionStatement;
