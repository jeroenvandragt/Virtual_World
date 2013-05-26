private var spring = 50.0;
private var damper = 5.0;
private var drag = 1.0;
private var angularDrag = 5.0;
private var distance = 0.5;
private var attachToCenterOfMass = true;

private var springJoint : SpringJoint;

function Update () {
    if (!Input.GetMouseButtonDown (0))
        return;

    var mainCamera = FindCamera();

    var hit : RaycastHit;
    if (!Physics.Raycast(mainCamera.ScreenPointToRay(Input.mousePosition),  hit, 100))
        return;
    if (!hit.rigidbody || hit.rigidbody.isKinematic)
        return;

    if (!springJoint)
    {
        var go = new GameObject("Rigidbody dragger");
        body = go.AddComponent ("Rigidbody");
        springJoint = go.AddComponent ("SpringJoint");
        body.isKinematic = true;
    }

    springJoint.transform.position = hit.point;
    if (attachToCenterOfMass) {
        var anchor = transform.TransformDirection(hit.rigidbody.centerOfMass) + hit.rigidbody.transform.position;
        anchor = springJoint.transform.InverseTransformPoint(anchor);
        springJoint.anchor = anchor;
    }
    else {
        springJoint.anchor = Vector3.zero;
    }

    springJoint.spring = spring;
    springJoint.damper = damper;
    springJoint.maxDistance = distance;
    springJoint.connectedBody = hit.rigidbody;

    StartCoroutine ("DragObject", hit.distance);
}

function DragObject (distance:float) {
    var oldDrag = springJoint.connectedBody.drag;
    var oldAngularDrag = springJoint.connectedBody.angularDrag;
    springJoint.connectedBody.drag = drag;
    springJoint.connectedBody.angularDrag = angularDrag;
    var mainCamera = FindCamera();
    while (Input.GetMouseButton (0))
    {
        var ray = mainCamera.ScreenPointToRay (Input.mousePosition);
        springJoint.transform.position = ray.GetPoint(distance);
        yield;
    }
    if (springJoint.connectedBody)
    {
        springJoint.connectedBody.drag = oldDrag;
        springJoint.connectedBody.angularDrag = oldAngularDrag;
        springJoint.connectedBody = null;
    }
}

function FindCamera () {
    if (camera)
        return camera;
    else
        return Camera.main;
}
